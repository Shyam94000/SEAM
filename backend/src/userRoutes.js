const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const faceapi = require('face-api.js');
const { createCanvas, loadImage } = require('canvas');
const { body, validationResult } = require('express-validator');
const UserRepository = require('./userRepository');

class UserRoutes {
  constructor(logger) {
    this.router = express.Router();
    this.logger = logger;
    this.userRepo = new UserRepository(logger);

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
    // Middleware to initialize database and models
    this.router.use(async (req, res, next) => {
      try {
        await this.userRepo.connect();
        await this.userRepo.createUserTable();
        await this.userRepo.loadModels();
        next();
      } catch (error) {
        this.logger.error('Initialization error', { message: error.message });
        res.status(500).json({ error: 'Initialization failed', details: error.message });
      }
    });

    // Registration route
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

    // Authentication route
    this.router.post(
      '/authenticate',
      [
        body('aadharNumber').isLength({ min: 12, max: 12 }).withMessage('Invalid Aadhar number format'),
        body('descriptor').isArray().withMessage('Descriptor must be an array'),
      ],
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        try {
          const { aadharNumber, descriptor } = req.body;

          // Retrieve stored face descriptor and user data
          const user = await this.userRepo.getUserDetails(aadharNumber);

          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }

          const descriptor1Str = user.FaceDescriptor; // Assuming it's stored as a string
          const descriptor1Dict = JSON.parse(descriptor1Str); // Parse the JSON string into an object
          const descriptor1Array = Object.values(descriptor1Dict);

          // Compare face descriptors
          const isMatch = await this.userRepo.compareDescriptors(descriptor1Array, descriptor);

          if (isMatch) {
            res.json({
              authenticated: true,
              name: user.Name,
              aadharNumber: user.AadharNumber,
              image: user.Image, // Base64 encoded image
            });
          } else {
            res.status(401).json({
              authenticated: false,
              message: 'Authentication failed',
            });
          }
        } catch (error) {
          this.logger.error('Authentication error', { message: error.message });
          res.status(500).json({ error: 'Authentication failed', details: error.message });
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
