const sql = require('mssql');
const faceapi = require('face-api.js');
const path = require('path');
const { Canvas, Image } = require('canvas');
const fs = require('fs').promises;
const performance = require('perf_hooks').performance;

const config = {
  user: process.env.DB_USER || 'shock94000',
  password: process.env.DB_PASSWORD || 'Keyboard32',
  server: process.env.DB_SERVER || 'seam-server.database.windows.net',
  database: process.env.DB_NAME || 'seam-db',
  options: {
    encrypt: true, // For Azure SQL
    trustServerCertificate: false,
    connectTimeout: 30000, // 30 seconds
    requestTimeout: 30000 // 30 seconds
  }
};

class UserRepository {
  constructor(logger) {
    this.logger = logger;
    this.pool = null;
    this.modelsLoaded = false;
  }

  // Create and connect using a connection pool
  async connect() {
    try {
      if (!this.pool) {
        this.pool = await sql.connect(config);
        this.pool.on('error', err => {
          this.logger.error('Database connection error', { message: err.message });
        });
      }
      this.logger.info('Successfully connected to Azure SQL Database');
      return this.pool;
    } catch (err) {
      this.logger.error('Database connection error', { message: err.message, stack: err.stack });
      throw new Error(`Database connection failed: ${err.message}`);
    }
  }

  // Create Users table if not exists
  async createUserTable() {
    try {
      const pool = await this.connect();
      const request = pool.request();
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
      this.logger.error('Error creating users table', { message: err.message, stack: err.stack });
      throw new Error(`Table creation failed: ${err.message}`);
    }
  }

  async createLogsTable() {
    try {
      const pool = await this.connect();
      const request = pool.request();
      await request.query(`
        IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Logs' AND xtype='U')
        CREATE TABLE Logs (
          Id INT IDENTITY(1,1) PRIMARY KEY,
          Name NVARCHAR(100) NOT NULL,
          AadharNumber NVARCHAR(20) NOT NULL,
          Image NVARCHAR(MAX) NOT NULL,
          Description NVARCHAR(MAX) NOT NULL,
          IPAddress NVARCHAR(50) NOT NULL,
          Timestamp DATETIME DEFAULT GETDATE() AT TIME ZONE 'India Standard Time'
        )
      `);
      this.logger.info('Logs table created or already exists');
    } catch (err) {
      this.logger.error('Error creating logs table', { message: err.message, stack: err.stack });
      throw new Error(`Logs table creation failed: ${err.message}`);
    }
  }

  // Load face recognition models only once
  async loadModels() {
    try {
      if (!this.modelsLoaded) {
        this.logger.info('Starting to load face recognition models');
        // Verify models directory exists
        const modelsPath = path.join(__dirname, 'models');
        try {
          await fs.access(modelsPath);
        } catch (dirErr) {
          this.logger.error('Models directory does not exist', { path: modelsPath, error: dirErr.message });
          throw new Error(`Models directory not found: ${modelsPath}`);
        }

        // Monkey patch for face-api.js
        faceapi.env.monkeyPatch({ Canvas, Image });

        // Load specific models
        await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath);
        await faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath);
        await faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath);
        
        this.modelsLoaded = true;
        this.logger.info('All face recognition models loaded successfully');
      }
    } catch (error) {
      this.logger.error('Comprehensive model loading error', { message: error.message, stack: error.stack });
      throw new Error(`Model initialization failed: ${error.message}`);
    }
  }

  // Upload user details to the database
  async uploadUserDetails(userData) {
    try {
      if (!userData.name || !userData.aadharNumber || !userData.faceDescriptor || !userData.image) {
        throw new Error('Missing required user details');
      }

      const pool = await this.connect(); // Use the pooled connection
      const request = pool.request();

      const query = `
        INSERT INTO Users (Name, AadharNumber, FaceDescriptor, Image)
        VALUES (@name, @aadharNumber, @faceDescriptor, @image)
      `;

      request.input('name', sql.NVarChar, userData.name);
      request.input('aadharNumber', sql.NVarChar, userData.aadharNumber);
      request.input('faceDescriptor', sql.NVarChar, JSON.stringify(userData.faceDescriptor));
      request.input('image', sql.NVarChar, userData.image); // Store Base64 string

      const result = await request.query(query);
      this.logger.info('User details uploaded successfully', { name: userData.name, aadharNumber: userData.aadharNumber });
      return result;
    } catch (err) {
      this.logger.error('Error uploading user details', { message: err.message, stack: err.stack });
      throw new Error(`User upload failed: ${err.message}`);
    }
  }

  async getUserLogs(aadharNumber) {
    try {
      const pool = await this.connect();  // Use 'this.connect()' instead of 'this.userRepo.connect()'
      const request = pool.request();
  
      const query = `
        SELECT TOP 50 
          Name, 
          AadharNumber, 
          Image, 
          Description, 
          IPAddress, 
          Timestamp
        FROM Logs
        WHERE AadharNumber = @aadharNumber
        ORDER BY Timestamp DESC
      `;
  
      request.input('aadharNumber', sql.NVarChar, aadharNumber);
  
      const result = await request.query(query);
      return result.recordset;
    } catch (err) {
      this.logger.error('Error retrieving user logs', { 
        message: err.message, 
        stack: err.stack,
        aadharNumber: aadharNumber 
      });
      throw new Error(`Failed to retrieve logs: ${err.message}`);
    }
  }
  
  

  // Retrieve user details from the database by Aadhar number
  async getUserDetails(aadharNumber) {
    try {
      const pool = await this.connect(); // Use the pooled connection
      const request = pool.request();
      const query = `
        SELECT Name, AadharNumber, FaceDescriptor, Image
        FROM Users
        WHERE AadharNumber = @aadharNumber
      `;
      request.input('aadharNumber', sql.NVarChar, aadharNumber);

      const result = await request.query(query);

      if (result.recordset.length === 0) {
        return null; // No user found
      }

      const user = result.recordset[0];
      // Ensure faceDescriptor is in the correct format
      if (Array.isArray(user.faceDescriptor)) {
        user.faceDescriptor = user.faceDescriptor; // Already an array
      } else {
        this.logger.error('Invalid faceDescriptor format', { user });
      }

      return user;
    } catch (err) {
      this.logger.error('Error retrieving user details', { message: err.message, stack: err.stack });
      throw new Error(`Error retrieving user details: ${err.message}`);
    }
  }
  async logAuthenticationAttempt(userData) {
    try {
      // Validate input
      if (!userData.name || !userData.aadharNumber || !userData.image || !userData.description || !userData.ipAddress) {
        throw new Error('Missing required log details');
      }
  
      const pool = await this.connect();
      const request = pool.request();
  
      const query = `
        INSERT INTO Logs (Name, AadharNumber, Image, Description, IPAddress, Timestamp)
        VALUES (@name, @aadharNumber, @image, @description, @ipAddress, @timestamp)
      `;
  
      // Create IST timestamp using Date object directly
      const istTimestamp = new Date().toLocaleString('en-US', { 
        timeZone: 'Asia/Kolkata'
      });
  
      // Convert to Date object directly without using `toLocaleString` if needed
      const timestamp = new Date(istTimestamp);
  
      request.input('name', sql.NVarChar, userData.name);
      request.input('aadharNumber', sql.NVarChar, userData.aadharNumber);
      request.input('image', sql.NVarChar, userData.image);
      request.input('description', sql.NVarChar, userData.description);
      request.input('ipAddress', sql.NVarChar, userData.ipAddress);
      request.input('timestamp', sql.DateTime, timestamp); // Pass Date object directly to SQL
  
      const result = await request.query(query);
  
      this.logger.info('Authentication attempt logged successfully', { 
        name: userData.name, 
        aadharNumber: userData.aadharNumber, 
        description: userData.description,
        timestamp: timestamp
      });
      console.log('Authentication attempt logged successfully', { 
        name: userData.name, 
        aadharNumber: userData.aadharNumber, 
        description: userData.description,
        timestamp: timestamp
      });
    } catch (err) {
      this.logger.error('Error logging authentication attempt', { message: err.message, stack: err.stack });
      throw new Error(`Log authentication attempt failed: ${err.message}`);
    }
  }
  

  async compareDescriptors(descriptor1, descriptor2, threshold = 0.45) {
    try {


      const start = performance.now();
      const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
      const isMatch = distance < threshold;
      const end = performance.now();
      const timeTaken = end - start;

      console.log('Time taken to compare face descriptors', { timeTaken: `${timeTaken.toFixed(3)} ms` });
      return isMatch;
    } catch (err) {
      this.logger.error('Error comparing face descriptors', { message: err.message });
      throw err;
    }
  }
  async initializeDatabase() {
    try {
      await this.createUserTable();
      await this.createLogsTable();
      await this.loadModels();
      this.logger.info('Database and models initialized successfully');
    } catch (err) {
      this.logger.error('Database initialization failed', { message: err.message, stack: err.stack });
      throw err;
    }
  }
  async updateUserDetails(userData) {
    try {
      if (!userData.name || !userData.aadharNumber) {
        throw new Error('Missing required user details');
      }
  
      const pool = await this.connect();
      const request = pool.request();
  
      // Prepare the update query
      let query = `
        UPDATE Users 
        SET Name = @name
        ${userData.image ? ', Image = @image' : ''}
        WHERE AadharNumber = @aadharNumber
      `;
  
      request.input('name', sql.NVarChar, userData.name);
      request.input('aadharNumber', sql.NVarChar, userData.aadharNumber);
      
      // Add image input only if it's provided
      if (userData.image) {
        request.input('image', sql.NVarChar, userData.image);
      }
  
      const result = await request.query(query);
      
      this.logger.info('User details updated successfully', { 
        name: userData.name, 
        aadharNumber: userData.aadharNumber 
      });
      
      return result;
    } catch (err) {
      this.logger.error('Error updating user details', { message: err.message, stack: err.stack });
      throw new Error(`User update failed: ${err.message}`);
    }
  }  async updateUserDetails(userData) {
    try {
      if (!userData.name || !userData.aadharNumber) {
        throw new Error('Missing required user details');
      }

      const pool = await this.connect();
      const request = pool.request();

      // Prepare the update query
      let query = `
        UPDATE Users 
        SET Name = @name
        ${userData.image ? ', Image = @image' : ''}
        WHERE AadharNumber = @aadharNumber
      `;

      request.input('name', sql.NVarChar, userData.name);
      request.input('aadharNumber', sql.NVarChar, userData.aadharNumber);

      // Add image input only if it's provided
      if (userData.image) {
        request.input('image', sql.NVarChar, userData.image);
      }

      const result = await request.query(query);

      this.logger.info('User details updated successfully', {
        name: userData.name,
        aadharNumber: userData.aadharNumber
      });

      return result;
    } catch (err) {
      this.logger.error('Error updating user details', { message: err.message, stack: err.stack });
      throw new Error(`User update failed: ${err.message}`);
    }
  }
}

module.exports = UserRepository;