const express = require('express');
const sql = require('mssql');

class AuthStatsRoute {
  constructor(logger, dbConfig) {
    this.router = express.Router();
    this.logger = logger;
    this.dbConfig = dbConfig;
  }

  initializeRoutes() {
    this.router.get('/hourly-logins', async (req, res) => {
      try {
        // Establish database connection
        const pool = await sql.connect(this.dbConfig);

        // Query to get successful logins per hour in the last 24 hours
        const hourlyLoginsQuery = `
          SELECT 
            DATEPART(HOUR, Timestamp) AS hour,
            COUNT(*) AS successfulLogins
          FROM Logs
          WHERE 
            Timestamp >= DATEADD(HOUR, -24, GETDATE()) AND
            Description = 'Successful Face Authentication'
          GROUP BY DATEPART(HOUR, Timestamp)
          ORDER BY hour
        `;

        // Execute query
        const result = await pool.request().query(hourlyLoginsQuery);

        // Transform results to ensure all 24 hours are represented
        const allHours = Array.from({length: 24}, (_, i) => ({
          hour: i.toString().padStart(2, '0'),
          successfulLogins: 0
        }));

        result.recordset.forEach(record => {
          const hourIndex = allHours.findIndex(h => h.hour === record.hour.toString().padStart(2, '0'));
          if (hourIndex !== -1) {
            allHours[hourIndex].successfulLogins = record.successfulLogins;
          }
        });

        // Log the hourly login statistics
        this.logger.info('Hourly Login Statistics Retrieved', {
          totalLoginHours: allHours.length,
          totalLogins: allHours.reduce((sum, hour) => sum + hour.successfulLogins, 0)
        });

        // Return hourly login data
        res.json(allHours);

      } catch (error) {
        // Comprehensive error logging
        this.logger.error('Error retrieving hourly login statistics', {
          message: error.message,
          stack: error.stack
        });

        res.status(500).json({
          error: 'Failed to retrieve hourly login statistics',
          details: error.message
        });
      } finally {
        // Ensure connection is closed
        await sql.close();
      }
    });

    this.router.get('/auth-stats', async (req, res) => {
      try {
        // Establish database connection
        const pool = await sql.connect(this.dbConfig);

        // Query to get total authentication attempts
        const totalAttemptsQuery = `
          SELECT COUNT(*) AS totalAttempts 
          FROM Logs
        `;

        const successfulAttemptsQuery = `
          SELECT COUNT(*) AS successfulAttempts 
          FROM Logs 
          WHERE Description = 'Successful Face Authentication'
        `;

        const failedAttemptsQuery = `
          SELECT COUNT(*) AS failedAttempts 
          FROM Logs 
          WHERE Description = 'Failed Face Authentication'
        `;

        // Execute queries concurrently
        const [
          totalAttemptsResult, 
          successfulAttemptsResult, 
          failedAttemptsResult
        ] = await Promise.all([
          pool.request().query(totalAttemptsQuery),
          pool.request().query(successfulAttemptsQuery),
          pool.request().query(failedAttemptsQuery)
        ]);

        // Extract values
        const totalAttempts = totalAttemptsResult.recordset[0].totalAttempts;
        const successfulAuth = successfulAttemptsResult.recordset[0].successfulAttempts;
        const failedAuth = failedAttemptsResult.recordset[0].failedAttempts;

        // Log the statistics
        this.logger.info('Authentication Statistics Retrieved', {
          totalAttempts,
          successfulAuth,
          failedAuth
        });

        // Return statistics
        res.json({
          totalAttempts,
          successfulAuth,
          failedAuth,
          successRate: totalAttempts > 0 
            ? ((successfulAuth / totalAttempts) * 100).toFixed(2) 
            : 0
        });

      } catch (error) {
        // Comprehensive error logging
        this.logger.error('Error retrieving authentication statistics', {
          message: error.message,
          stack: error.stack
        });

        res.status(500).json({
          error: 'Failed to retrieve authentication statistics',
          details: error.message
        });
      } finally {
        // Ensure connection is closed
        await sql.close();
      }
    });

    return this.router;
  }

  getRouter() {
    return this.router;
  }
}

module.exports = AuthStatsRoute;