const fs = require('fs');
const path = require('path');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// File logger middleware
const fileLogger = (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // Log requests with status >= 400
    if (res.statusCode >= 400) {
      const timestamp = new Date().toISOString();
      const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      const logFile = path.join(logsDir, `${date}.log`);
      
      const logEntry = {
        timestamp,
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent'),
        body: req.body,
        error: data
      };
      
      const logLine = `[${timestamp}] ${req.method} ${req.originalUrl} - ${res.statusCode} - IP: ${logEntry.ip}\n`;
      
      try {
        fs.appendFileSync(logFile, logLine);
      } catch (error) {
        console.error('Failed to write to log file:', error.message);
      }
    }
    
    // Call original send
    originalSend.call(this, data);
  };
  
  next();
};

module.exports = fileLogger;











