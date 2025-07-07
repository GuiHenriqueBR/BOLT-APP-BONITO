import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';
import { AppError } from '../types';
import { logger } from '../utils/logger';
import config from '../config';

interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
  details?: any;
  stack?: string;
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let details: any = null;

  // Log the error
  logger.error('Error caught by error handler:', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  // Handle different types of errors
  if (error instanceof AppError) {
    // Custom application errors
    statusCode = error.statusCode;
    message = error.message;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle Prisma errors
    const prismaError = handlePrismaError(error);
    statusCode = prismaError.statusCode;
    message = prismaError.message;
    details = prismaError.details;
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = 400;
    message = 'Invalid data provided';
    details = config.isDevelopment ? error.message : null;
  } else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
    details = extractValidationErrors(error);
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data format';
  } else if (error.name === 'MulterError') {
    const multerError = handleMulterError(error as any);
    statusCode = multerError.statusCode;
    message = multerError.message;
  }

  // Prepare error response
  const errorResponse: ErrorResponse = {
    success: false,
    error: message,
  };

  // Add details in development
  if (config.isDevelopment) {
    errorResponse.details = details;
    errorResponse.stack = error.stack;
  }

  // Send error response
  res.status(statusCode).json(errorResponse);
};

const handlePrismaError = (error: Prisma.PrismaClientKnownRequestError) => {
  const { code, meta } = error;

  switch (code) {
    case 'P2002':
      // Unique constraint violation
      const field = (meta?.target as string[])?.join(', ') || 'field';
      return {
        statusCode: 409,
        message: `${field} already exists`,
        details: { field, constraint: 'unique' },
      };

    case 'P2025':
      // Record not found
      return {
        statusCode: 404,
        message: 'Record not found',
        details: { operation: meta?.cause },
      };

    case 'P2003':
      // Foreign key constraint violation
      return {
        statusCode: 400,
        message: 'Invalid reference to related record',
        details: { field: meta?.field_name },
      };

    case 'P2014':
      // Required relation violation
      return {
        statusCode: 400,
        message: 'Required relation missing',
        details: { relation: meta?.relation_name },
      };

    default:
      return {
        statusCode: 500,
        message: 'Database operation failed',
        details: config.isDevelopment ? { code, meta } : null,
      };
  }
};

const handleMulterError = (error: any) => {
  switch (error.code) {
    case 'LIMIT_FILE_SIZE':
      return {
        statusCode: 400,
        message: 'File too large',
      };
    case 'LIMIT_FILE_COUNT':
      return {
        statusCode: 400,
        message: 'Too many files',
      };
    case 'LIMIT_UNEXPECTED_FILE':
      return {
        statusCode: 400,
        message: 'Unexpected file field',
      };
    default:
      return {
        statusCode: 400,
        message: 'File upload error',
      };
  }
};

const extractValidationErrors = (error: any) => {
  if (error.errors) {
    return Object.keys(error.errors).map(key => ({
      field: key,
      message: error.errors[key].message,
    }));
  }
  return null;
};

// Not found handler
export const notFoundHandler = (req: Request, res: Response) => {
  const message = `Route ${req.originalUrl} not found`;
  
  logger.warn('404 Not Found:', {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  res.status(404).json({
    success: false,
    error: 'Not Found',
    message,
  });
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};