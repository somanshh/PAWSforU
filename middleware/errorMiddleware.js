const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
  
    // Mongoose Validation Error
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({
        message: 'Validation Error',
        errors
      });
    }
  
    // Mongoose Duplicate Key Error
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Duplicate Key Error',
        error: `${Object.keys(err.keyValue)} already exists`
      });
    }
  
    // JWT Authentication Error
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        message: 'Invalid or expired token'
      });
    }
  
    // Default Server Error
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  module.exports = errorMiddleware;