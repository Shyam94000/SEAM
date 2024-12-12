const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const faceapi = require('face-api.js');
const { createCanvas, loadImage } = require('canvas');
const { body, validationResult } = require('express-validator');
const UserRepository = require('./userRepository'); // This imports the class

class UserRoutes {
  constructor(logger) {
    this.router = express.Router();
    this.logger = logger;
    this.userRepo = new UserRepository(logger);

    this.userRepo.createLogsTable().catch(err => {
      this.logger.error('Failed to create logs table', { message: err.message });
    });

    // Configure file upload
    this.upload = multer({
      storage: multer.diskStorage({
        destination: async (req, file, cb) => {
          const uploadPath = path.join(__dirname, 'uploads');
          await fs.mkdir(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}_${file.originalname}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    });

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      '/register',
      this.upload.single('image'),
      [
        body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
        body('aadharNumber').isLength({ min: 12, max: 12 }).withMessage('Invalid Aadhar number format'),
      ],
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        try {
          const { name, aadharNumber } = req.body;
          const imagePath = req.file.path;

          // Validate inputs
          if (!name || !aadharNumber || !imagePath) {
            await fs.unlink(imagePath).catch(() => {});
            return res.status(400).json({ error: 'Missing required fields' });
          }

          // Read the image file and convert to Base64
          const imageBuffer = await fs.readFile(imagePath);
          const base64Image = imageBuffer.toString('base64');

          // Load image and detect face
          const image = await loadImage(imagePath);
          const canvas = createCanvas(image.width, image.height);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, image.width, image.height);

          // Detect face
          const detection = await faceapi
            .detectSingleFace(canvas)
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (!detection) {
            await fs.unlink(imagePath);
            return res.status(400).json({ error: 'No face detected in the image' });
          }

          // Upload user details with face descriptor and Base64 image
          await this.userRepo.uploadUserDetails({
            name,
            aadharNumber,
            faceDescriptor: detection.descriptor,
            image: base64Image, // Store Base64 encoded image
          });

          res.status(201).json({
            message: 'User registered successfully',
            descriptor: detection.descriptor,
          });
        } catch (error) {
          this.logger.error('Registration error', { message: error.message });
          res.status(500).json({ error: 'Registration failed', details: error.message });
        }
      }
    );

    this.router.post(
      '/authenticate',
      [
        body('aadharNumber').isLength({ min: 12, max: 12 }).withMessage('Invalid Aadhar number format'),
        body('descriptor').isArray().withMessage('Descriptor must be an array'),
      ],
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ 
            authenticated: false,
            errors: errors.array(),
            message: 'Validation failed'
          });
        }

        try {
          const { aadharNumber, descriptor, image } = req.body;

          // Retrieve stored user data
          const user = await this.userRepo.getUserDetails(aadharNumber);
          if (!user) {
            return res.status(404).json({
              authenticated: false,
              error: 'User not found',
              message: 'No user exists with this Aadhar number',
              aadharNumber: aadharNumber
            });
          }

          // Validate descriptor
          if (!descriptor || !Array.isArray(descriptor) || descriptor.length === 0) {
            return res.status(400).json({
              authenticated: false,
              error: 'Invalid face descriptor',
              message: 'Face descriptor is required and must be a non-empty array'
            });
          }
          // Parse stored face descriptor
          let storedDescriptorArray;
          try {
            const storedDescriptor = JSON.parse(user.FaceDescriptor);
            storedDescriptorArray = Array.isArray(storedDescriptor) 
              ? storedDescriptor 
              : Object.values(storedDescriptor);
          } catch (parseError) {
            this.logger.error('Error parsing stored face descriptor', { 
              message: parseError.message,
              storedDescriptor: user.FaceDescriptor 
            });
            return res.status(500).json({
              authenticated: false,
              error: 'Internal server error',
              message: 'Error processing stored face data'
            });
          }

          // Compare face descriptors
          const isMatch = await this.userRepo.compareDescriptors(
            storedDescriptorArray, 
            descriptor
          );

          // Prepare detailed authentication attempt log
          const logData = {
            name: user.Name,
            aadharNumber: user.AadharNumber,
            image: image || 'No image provided',
            description: isMatch 
              ? 'Successful Face Authentication' 
              : 'Failed Face Authentication',
            ipAddress: req.ip || 'Unknown'
          };

          // Log the authentication attempt
          await this.userRepo.logAuthenticationAttempt(logData);

          // Prepare response based on authentication result
          if (isMatch) {
            res.json({
              authenticated: true,
              name: user.Name,
              aadharNumber: user.AadharNumber,
              image: user.Image || null,
              message: 'Authentication successful',
              details: {
                faceMatchConfidence: 'High',
                timestamp: new Date().toISOString()
              }
            });
          } else {
            res.status(401).json({
              authenticated: false,
              name: user.Name,
              aadharNumber: user.AadharNumber,
              message: 'Authentication failed - Face does not match',
              details: {
                reason: 'Face descriptor mismatch',
                timestamp: new Date().toISOString()
              }
            });
          }
        } catch (error) {
          // Comprehensive error logging
          this.logger.error('Authentication process error', { 
            message: error.message,
            stack: error.stack,
            aadharNumber: req.body.aadharNumber
          });

          res.status(500).json({
            authenticated: false,
            error: 'Authentication process failed',
            message: 'An unexpected error occurred during authentication',
            details: error.message
          });
        }
      }
    );

    this.router.get('/user-logs/:aadharNumber', async (req, res) => {
      try {
        const aadharNumber = req.params.aadharNumber;
    
        // Validate Aadhar number
        if (!/^\d{12}$/.test(aadharNumber)) {
          return res.status(400).json({ 
            error: 'Invalid Aadhar number format' 
          });
        }
    
        // Retrieve logs
        const logs = await this.userRepo.getUserLogs(aadharNumber);
    
        res.json({ 
          logs: logs,
          totalLogs: logs.length
        });
      } catch (error) {
        this.logger.error('User logs retrieval error', { 
          message: error.message,
          aadharNumber: req.params.aadharNumber
        });
    
        res.status(500).json({ 
          error: 'Failed to retrieve logs',
          message: error.message 
        });
      }
    });
    

    // Update profile route
    this.router.put(
      '/update-profile', 
      this.upload.single('document'), 
      [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('aadharNumber').isLength({ min: 12, max: 12 }).withMessage('Invalid Aadhaar Number'),
        body('currentAadharNumber').isLength({ min: 12, max: 12 }).withMessage('Invalid Current Aadhaar Number')
      ],
      async (req, res) => {
        // Validate input
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ 
            success: false, 
            errors: errors.array() 
          });
        }

        try {
          const { name, aadharNumber, currentAadharNumber } = req.body;
          
          // Validate name length
          if (name.trim().length < 2) {
            return res.status(400).json({ 
              success: false, 
              error: 'Name must be at least 2 characters long' 
            });
          }

          // Verify current user exists
          const currentUser = await this.userRepo.getUserDetails(currentAadharNumber);
          if (!currentUser) {
            return res.status(404).json({ 
              success: false, 
              error: 'Current user not found' 
            });
          }

          // Prepare user data for update
          const userData = {
            name: name.trim(),
            aadharNumber,
            image: req.file 
              ? req.file.buffer.toString('base64') 
              : currentUser.Image // Use existing image if no new image provided
          };

          // Update user details
          const result = await this.userRepo.updateUserDetails(userData);

          // Log the update event
          await this.userRepo.logProfileUpdateAttempt({
            name: userData.name,
            aadharNumber: userData.aadharNumber,
            oldName: currentUser.Name,
            imageChanged: !!req.file,
            timestamp: new Date()
          });

          res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
              name: userData.name,
              aadharNumber: userData.aadharNumber,
              imageUpdated: !!req.file
            }
          });
        } catch (error) {
          this.logger.error('Profile update error', { 
            message: error.message, 
            stack: error.stack 
          });

          res.status(500).json({ 
            success: false,
            error: 'Profile update failed',
            details: error.message 
          });
        }
      }
    );

    return this.router;
  }

  getRouter() {
    return this.router;
  }
}

module.exports = UserRoutes;