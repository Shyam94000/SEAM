const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const https = require('https');
const http = require('http');
const dotenv = require('dotenv');
const faceapi = require('face-api.js');
const { Canvas, Image } = require('canvas');
const UserRoutes = require('./userRoutes'); // New user routes
const ModelHandler = require('./modelHandler');

// Load environment variables
dotenv.config();



class SecureModelServer {
  constructor() {
    this.app = express();
    this.modelHandler = new ModelHandler();
    this.logger = this.setupLogger();

    // Setup Multer for file uploads
    this.upload = multer({
      storage: multer.diskStorage({
        destination: async (req, file, cb) => {
          const uploadPath = path.join(__dirname, 'models/encrypted');
          await fs.mkdir(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          cb(null, `encrypted_${file.originalname}`);
        }
      }),
      limits: { fileSize: 100 * 1024 * 1024, files: 10 } // Max 100MB, max 10 files
    });

    this.setupMiddleware();
    this.setupRoutes();
  }

  setupLogger() {
    return winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'server.log' })
      ]
    });
  }

  setupMiddleware() {
    // Apply security middleware
    this.app.use(helmet());

    // Rate limiting
    this.app.use(rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      standardHeaders: true,
      legacyHeaders: false
    }));

    // Enable CORS
    this.app.use(cors({
      origin: true,
      methods: ['GET', 'POST','OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }));
    this.app.options('*', cors());

    // Enable JSON parsing
    this.app.use(express.json({ limit: '10mb' }));
  }

  setupRoutes() {
    // Health and readiness routes
    this.app.get('/health', (req, res) => res.status(200).json({
      status: 'very healthy!',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memoryUsage: process.memoryUsage()
    }));

    this.app.get('/readiness', async (req, res) => {
      try {
        await fs.access(path.join(__dirname, 'models/encrypted'));
        res.status(200).json({ status: 'ready', timestamp: new Date().toISOString() });
      } catch {
        res.status(500).json({ status: 'not ready' });
      }
    });

    // Model upload
    this.app.post('/upload-model', this.upload.array('models'), async (req, res) => {
      try {
        if (!req.files || req.files.length === 0) {
          this.logger.warn('No files uploaded');
          return res.status(400).json({ error: 'No files uploaded' });
        }

        const uploadedFiles = await Promise.all(req.files.map(async (file) => {
          const fileBuffer = await fs.readFile(file.path);
          const encryptedBuffer = this.modelHandler.encrypt(fileBuffer);
          const encryptedPath = path.join(__dirname, 'models/encrypted', file.originalname);
          await fs.writeFile(encryptedPath, encryptedBuffer);
          await fs.unlink(file.path); // Delete original file
          return { originalName: file.originalname };
        }));

        res.json({ message: 'Models uploaded successfully', files: uploadedFiles });
      } catch (error) {
        this.logger.error('Upload error', { message: error.message });
        res.status(500).json({ error: 'Upload failed', details: error.message });
      }
    });

    // Serve models (decrypted)
    this.app.get('/models/:modelName', async (req, res) => {
      try {
        const modelName = req.params.modelName;
        const encryptedModelName = `encrypted_${modelName}`;
        const encryptedPath = path.join(__dirname, 'models/encrypted', encryptedModelName);

        if (await this.modelHandler.fileExists(encryptedPath)) {
          const encryptedBuffer = await fs.readFile(encryptedPath);
          const decryptedBuffer = this.modelHandler.decrypt(encryptedBuffer);
          res.setHeader('Content-Type', modelName.endsWith('.json') ? 'application/json' : 'application/octet-stream');
          res.setHeader('Content-Disposition', `attachment; filename="${modelName}"`);
          res.send(decryptedBuffer);
        } else {
          res.status(404).json({ error: 'Model not found' });
        }
      } catch (error) {
        this.logger.error('Model serve error', { message: error.message });
        res.status(500).json({ error: 'Failed to serve model', details: error.message });
      }
    });

    const userRoutes = new UserRoutes(this.logger);
    this.app.use('/api/user', userRoutes.getRouter()); 
    

    // Serve registration HTML
    this.app.get('/register', (req, res) => {
      res.sendFile(path.join(__dirname, 'registration.html'));
    });

  

    // Catch-all error handler
    this.app.use((err, req, res, next) => {
      this.logger.error('Internal Server Error', { message: err.message });
      res.status(500).json({ error: 'Internal Server Error', message: err.message });
    });
  }

  
  async start(port = process.env.PORT || 3000) {
    try {
      // Create directories if they don't exist
      const encryptedDir = path.join(__dirname, 'models/encrypted');
      await fs.mkdir(encryptedDir, { recursive: true });
      const uploadDir = path.join(__dirname, 'uploads');
      await fs.mkdir(uploadDir, { recursive: true });
  
      // Start the server
      this.logger.info('Starting server...');
      http.createServer(this.app).listen(port, () => {
        this.logger.info(`Server is running on port ${port}`);
      });
    } catch (error) {
      this.logger.error('Error starting the server', { message: error.message });
      process.exit(1);
    }
  }
}

// Start the server
const server = new SecureModelServer();
server.start();
