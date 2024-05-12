import logger from '../utils/logger.mjs';

// Define error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log the error using Winston
  logger.error(err.stack);

  // Check if the error is related to JSON parsing
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    res.status(400).json({ error: 'Invalid JSON' }); // Respond with a 400 status for invalid JSON
  } else {
    res.status(500).json({ error: err.message }); // For other errors, respond with a 500 status and the error message
  }
};

export default errorHandler;
