const sql = require('mssql');

class EnhancedConnectionManager {
  constructor(config, logger) {
    this.config = config;
    this.logger = logger;
    this.pool = null;
    this.connectionAttempts = 0;
    this.MAX_CONNECTION_ATTEMPTS = 3;
    this.RECONNECT_DELAY = 5000; // 5 seconds
    this.lastConnectionCheck = null;
    this.CONNECTION_CHECK_INTERVAL = 60000; // 1 minute
  }

  async connect() {
    try {
      // If pool exists, check its health first
      if (this.pool) {
        await this.validateConnection();
        return this.pool;
      }

      // Create new connection pool
      this.pool = await sql.connect(this.config);

      // Set up error handling
      this.pool.on('error', async (err) => {
        this.logger.error('Database connection pool error', { 
          message: err.message, 
          stack: err.stack 
        });
        await this.reconnect();
      });

      this.connectionAttempts = 0;
      this.lastConnectionCheck = Date.now();
      this.logger.info('Successfully established database connection pool');

      return this.pool;
    } catch (err) {
      this.logger.error('Connection pool creation failed', { 
        message: err.message, 
        stack: err.stack,
        attempts: this.connectionAttempts
      });

      // Implement exponential backoff for reconnection
      await this.handleConnectionFailure(err);
      
      throw err;
    }
  }

  async validateConnection() {
    const currentTime = Date.now();
    
    // Check if connection is too old or potentially stale
    if (this.lastConnectionCheck && 
        (currentTime - this.lastConnectionCheck > this.CONNECTION_CHECK_INTERVAL)) {
      try {
        // Perform a lightweight query to test connection
        const request = this.pool.request();
        await request.query('SELECT 1');
        this.lastConnectionCheck = currentTime;
      } catch (err) {
        this.logger.warn('Stale connection detected, attempting reconnection');
        await this.reconnect();
      }
    }
  }

  async handleConnectionFailure(error) {
    this.connectionAttempts++;

    if (this.connectionAttempts > this.MAX_CONNECTION_ATTEMPTS) {
      this.logger.error('Max connection attempts exceeded', {
        maxAttempts: this.MAX_CONNECTION_ATTEMPTS
      });
      throw new Error('Unable to establish database connection');
    }

    // Exponential backoff
    const delay = this.RECONNECT_DELAY * Math.pow(2, this.connectionAttempts);
    
    this.logger.warn(`Connection attempt failed. Retrying in ${delay/1000} seconds`, {
      attempt: this.connectionAttempts,
      delay: delay
    });

    await new Promise(resolve => setTimeout(resolve, delay));
    await this.connect();
  }

  async reconnect() {
    try {
      // Close existing pool if it exists
      if (this.pool) {
        await this.pool.close();
        this.pool = null;
      }

      // Attempt to reconnect
      await this.connect();
    } catch (err) {
      this.logger.error('Reconnection failed', { 
        message: err.message, 
        stack: err.stack 
      });
    }
  }

  async closePool() {
    if (this.pool) {
      try {
        await this.pool.close();
        this.logger.info('Database connection pool closed successfully');
      } catch (err) {
        this.logger.error('Error closing connection pool', { 
          message: err.message, 
          stack: err.stack 
        });
      }
      this.pool = null;
    }
  }
}

module.exports = EnhancedConnectionManager;