import express from 'express';
import blockRoutes from './src/routes/blockRoutes.mjs';
import winston from 'winston';

console.log('Initializing Winston logger...');

const app = express();
const PORT = process.env.PORT || 3000;

// Define Winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log' }),
  ],
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1', blockRoutes);

// Handle invalid endpoint error
app.use((req, res, next) => {
  const error = new Error('Endpoint not found');
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.log('Error handler middleware called.');
  console.log('Error:', err);
  logger.error(err.stack); // Log the error using Winston
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
