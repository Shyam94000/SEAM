const sql = require('mssql');
const faceapi = require('face-api.js');
const path = require('path');
const { Canvas, Image } = require('canvas');
const fs = require('fs').promises;

// Configure Azure SQL Database connection
const config = {
  user: process.env.DB_USER || 'shock94000',
  password: process.env.DB_PASSWORD || 'Keyboard32',
  server: process.env.DB_SERVER || 'seam-server.database.windows.net',
  database: process.env.DB_NAME  || 'seam-db',
  options: {
    encrypt: true, // For Azure SQL
    trustServerCertificate: false,
    connectTimeout: 30000, // 30 seconds
    requestTimeout: 30000  // 30 seconds
  }
};

class UserRepository {
  constructor(logger) {
    this.logger = logger;
    this.modelsLoaded = false;
  }

  async connect() {
    try {
      // Log connection details (be careful not to log sensitive info in production)
      this.logger.info('Attempting to connect to database', { 
        server: config.server, 
        database: config.database 
      });

      await sql.connect(config);
      this.logger.info('Successfully connected to Azure SQL Database');
    } catch (err) {
      this.logger.error('Database connection error', { 
        message: err.message, 
        stack: err.stack 
      });
      throw new Error(`Database connection failed: ${err.message}`);
    }
  }

  async createUserTable() {
    try {
      const request = new sql.Request();
      await request.query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Users' AND xtype='U')
          CREATE TABLE Users (
            Id INT IDENTITY(1,1) PRIMARY KEY,
            Name NVARCHAR(100) NOT NULL,
            AadharNumber NVARCHAR(20) UNIQUE NOT NULL,
            FaceDescriptor NVARCHAR(MAX) NOT NULL,
            Image NVARCHAR(MAX) NOT NULL -- Store Base64 image here
          )
      `);
      this.logger.info('Users table created or already exists');
    } catch (err) {
      this.logger.error('Error creating users table', { 
        message: err.message, 
        stack: err.stack 
      });
      throw new Error(`Table creation failed: ${err.message}`);
    }
  }

  async loadModels() {
    try {
      if (!this.modelsLoaded) {
        // Log model loading start
        this.logger.info('Starting to load face recognition models');
  
        // Verify models directory exists
        const modelsPath = path.join(__dirname, 'models');
        try {
          await fs.access(modelsPath);
        } catch (dirErr) {
          this.logger.error('Models directory does not exist', { 
            path: modelsPath, 
            error: dirErr.message 
          });
          throw new Error(`Models directory not found: ${modelsPath}`);
        }
  
        // Monkey patch for face-api.js
        faceapi.env.monkeyPatch({ Canvas, Image });
  
        // Load specific models with detailed logging
        await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath);
        await faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath);
        await faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath);
  
        this.modelsLoaded = true;
        this.logger.info('All face recognition models loaded successfully');
      }
    } catch (error) {
      this.logger.error('Comprehensive model loading error', { 
        message: error.message, 
        stack: error.stack 
      });
      throw new Error(`Model initialization failed: ${error.message}`);
    }
  }
  async uploadUserDetails(userData) {
   // console.log("User details", userData.name, userData.aadharNumber, userData.faceDescriptor, userData.image);
    try {
      // Validate required fields
      if (!userData.name || !userData.aadharNumber || !userData.faceDescriptor || !userData.image) {
        throw new Error('Missing required user details');
      }
  
      const request = new sql.Request();
  
      const query = `
        INSERT INTO Users (Name, AadharNumber, FaceDescriptor, Image)
        VALUES (@name, @aadharNumber, @faceDescriptor, @image)
      `;
  
      // Add parameters to prevent SQL injection
      request.input('name', sql.NVarChar, userData.name);
      request.input('aadharNumber', sql.NVarChar, userData.aadharNumber);
      request.input('faceDescriptor', sql.NVarChar, JSON.stringify(userData.faceDescriptor));
      request.input('image', sql.NVarChar, userData.image); // Store Base64 string
  
      // Execute the insert
      const result = await request.query(query);
  
      // Log successful insertion
      this.logger.info('User details uploaded successfully', { 
        name: userData.name, 
        aadharNumber: userData.aadharNumber 
      });
  
      return result;
    } catch (err) {
      // Log and rethrow the error
      this.logger.error('Error uploading user details', { 
        message: err.message, 
        stack: err.stack 
      });
      throw new Error(`User upload failed: ${err.message}`);
    }
  }
  
  async compareDescriptors(descriptor1, descriptor2, threshold = 0.6) {
    try {

      const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
      return distance < threshold;
    } catch (err) {
      this.logger.error('Error comparing face descriptors', { message: err.message });
      throw err;
    }
  }
  // Method to retrieve user details from the database by Aadhar number
  async getUserDetails(aadharNumber) {
    try {
      const request = new sql.Request();
      const query = `
        SELECT Name, AadharNumber, FaceDescriptor, Image
        FROM Users
        WHERE AadharNumber = @aadharNumber
      `;
      
      // Add parameters to prevent SQL injection
      request.input('aadharNumber', sql.NVarChar, aadharNumber);
      
      // Execute the query
      const result = await request.query(query);
  
      if (result.recordset.length === 0) {
        return null; // No user found
      }
  
      const user = result.recordset[0];
  
      // Ensure faceDescriptor is already an array of numbers (no need for parsing)
      if (Array.isArray(user.faceDescriptor)) {
        user.faceDescriptor = user.faceDescriptor; // Already an array, no parsing needed
      } else {
        this.logger.error('Invalid faceDescriptor format', { user });
      }
    //  console.log("User details", user);
    //  console.log("Over!!!!!")
      return user;
    } catch (err) {
      this.logger.error('Error retrieving user details', { 
        message: err.message, 
        stack: err.stack 
      });
      throw new Error(`Error retrieving user details: ${err.message}`);
    }
  }
  
}

module.exports = UserRepository;