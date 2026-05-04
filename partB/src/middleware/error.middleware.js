import { ZodError } from 'zod';

// 404 handler - route not found
export function notFoundHandler(req, res, next) {
  res.status(404).json({
    error: {
      message: `Route ${req.method} ${req.url} not found`,
    },
  });
}

// Global error handler
export function errorHandler(err, req, res, next) {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        message: 'Validation failed',
        details: err.errors,
      },
    });
  }

  // Custom errors with statusCode
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
      },
    });
  }

  // Server error (default)
  console.error(err);
  res.status(500).json({
    error: {
      message: 'Internal server error',
    },
  });
}
