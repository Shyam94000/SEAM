const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const http = require('http');
const dotenv = require('dotenv');
const crypto = require('crypto');
const compression = require('compression');
const cluster = require('cluster');
const os = require('os');


// Import custom modules
const UserRoutes = require('./userRoutes');
const ModelHandler = require('./modelHandler');

// Load environment variables
dotenv.config();

class SecureModelServer {
  constructor() {
    this.app = express();
    this.modelHandler = new ModelHandler();
    this.logger = this.setupLogger();
    this.modelHashes = {}; // Store model hashes
    this.modelCache = new Map(); // In-memory model cache

    // Setup Multer for file uploads
    this.upload = multer({
      storage: multer.diskStorage({
        destination: async (req, file, cb) => {
          const uploadPath = path.join(__dirname, 'models/encrypted');
          await fsPromises.mkdir(uploadPath, { recursive: true });
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

  calculateModelHash(buffer) {
    return crypto.createHash('sha256').update(buffer).digest('hex');
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

    // Compression middleware
    this.app.use(compression());

    // Global rate limiting
    const globalRateLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // Limit each IP to 100 requests per windowMs
      message: 'Too many requests, please try again later',
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use(globalRateLimiter);

    // Specific route rate limiters
    const modelRateLimiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 50, // More restrictive for model routes
      message: 'Model request limit exceeded',
    });
    this.app.use('/models', modelRateLimiter);

    // Enable CORS
    this.app.use(cors({
      origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : true,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true
    }));
    this.app.options('*', cors());

    // Enable JSON parsing
    this.app.use(express.json({ limit: '10mb' }));
  }

  async precomputeModelHashes() {
    const modelsPath = path.join(__dirname, 'models');
    const modelFiles = [
      'ssd_mobilenetv1_model-shard1',
      'ssd_mobilenetv1_model-shard2',
      'ssd_mobilenetv1_model-weights_manifest.json',
      'face_landmark_68_model-shard1',
      'face_landmark_68_model-weights_manifest.json',
      'face_recognition_model-shard1',
      'face_recognition_model-shard2',
      'face_recognition_model-weights_manifest.json'
    ];
  
    const hashesFilePath = path.join(__dirname, 'model_hashes.json');
  
    try {
      // Try to load precomputed hashes
      if (fs.existsSync(hashesFilePath)) {
        const existingHashes = await fsPromises.readFile(hashesFilePath, 'utf8');
        this.modelHashes = JSON.parse(existingHashes);
        this.logger.info('Loaded precomputed model hashes');
        return;
      }
  
      // Compute hashes
      for (const modelName of modelFiles) {
        const modelPath = path.join(modelsPath, modelName);
        try {
          const modelBuffer = await fsPromises.readFile(modelPath);
          const modelHash = this.calculateModelHash(modelBuffer);
          this.modelHashes[modelName] = modelHash;
          this.modelCache.set(modelName, modelBuffer);
          this.logger.info(`Computed hash for model: ${modelName}`);
        } catch (fileError) {
          this.logger.warn(`Failed to process model file: ${modelName}`, { error: fileError.message });
        }
      }
  
      // Save hashes to file
      await fsPromises.writeFile(hashesFilePath, JSON.stringify(this.modelHashes, null, 2));
      this.logger.info('Saved computed model hashes');
    } catch (error) {
      this.logger.error('Error during precomputing model hashes', { message: error.message });
    }
  }
  

  setupRoutes() {
    // Health and readiness routes
    this.app.get('/health', (req, res) => res.status(200).json({
      status: 'very healthy!',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      memoryUsage: process.memoryUsage()
    }));



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



    const userRoutes = new UserRoutes(this.logger);
    this.app.use('/api/user', userRoutes.getRouter()); 
    

    // Serve registration HTML
    this.app.get('/register', (req, res) => {
      res.sendFile(path.join(__dirname, 'registration.html'));
    });

    this.app.get('/models/:modelName', async (req, res) => {
      try {
        console.log("Sent models")

        const modelName = req.params.modelName;
        const modelPath = path.join(__dirname, 'models', modelName);

        // Try to get from in-memory cache first
        if (this.modelCache.has(modelName)) {
          const cachedModel = this.modelCache.get(modelName);
          res.setHeader('Content-Type', modelName.endsWith('.json') ? 'application/json' : 'application/octet-stream');
          res.setHeader('Content-Disposition', `attachment; filename="${modelName}"`);
          res.setHeader('Cache-Control', 'public, max-age=3600'); // 1-hour cache
          return res.send(cachedModel);
        }

        // Check if file exists
        await fsPromises.access(modelPath);

        // Stream the file
        const fileStream = fs.createReadStream(modelPath);
        
        // Set headers
        res.setHeader('Content-Type', modelName.endsWith('.json') ? 'application/json' : 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${modelName}"`);
        res.setHeader('Cache-Control', 'public, max-age=3600'); // 1-hour cache
        // Pipe file stream and cache in memory for future requests
        fileStream.on('data', (chunk) => {
          if (!this.modelCache.has(modelName)) {
            this.modelCache.set(modelName, chunk);
          }
        });
        
        fileStream.pipe(res);
      } catch (error) {
        this.logger.error('Model serve error', { message: error.message, stack: error.stack });
        res.status(404).json({ error: 'Model not found', details: error.message });
      }
    });
    // Cached model hash route
    this.app.get('/model-hash', async (req, res) => {
      try {
        // Simply return precomputed model hashes
        res.json(this.modelHashes);
      } catch (error) {
        this.logger.error('Model hash error', { message: error.message });
        res.status(500).json({ error: 'Failed to retrieve model hashes', details: error.message });
      }
    });
    

  

    // Catch-all error handler
    this.app.use((err, req, res, next) => {
      this.logger.error('Internal Server Error', { message: err.message });
      res.status(500).json({ error: 'Internal Server Error', message: err.message });
    });
  }

  
  async start(port = process.env.PORT || 3000) {
    // Clustering support
    if (cluster.isPrimary) {
      this.logger.info(`Primary ${process.pid} is running`);

      // Fork workers
      const numCPUs = os.cpus().length;
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      // Handle worker exits
      cluster.on('exit', (worker, code, signal) => {
        this.logger.warn(`Worker ${worker.process.pid} died`);
        cluster.fork(); // Replace the dead worker
      });
    } else {
      try {
        // Precompute model hashes before starting the server
        await this.precomputeModelHashes();

        // Create necessary directories
        const encryptedDir = path.join(__dirname, 'models/encrypted');
        await fsPromises.mkdir(encryptedDir, { recursive: true });
        const uploadDir = path.join(__dirname, 'uploads');
        await fsPromises.mkdir(uploadDir, { recursive: true });
    
        // Start the server
        this.logger.info(`Worker ${process.pid} started`);
        http.createServer(this.app).listen(port, () => {
          this.logger.info(`Server is running on port ${port}`);
        });
      } catch (error) {
        this.logger.error('Error starting the server', { message: error.message });
        process.exit(1);
      }
    }
  }
}

// Start the server
const server = new SecureModelServer();
server.start();