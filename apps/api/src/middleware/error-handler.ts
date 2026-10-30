import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { logger } from './request-logger.js';
import { env } from '../config/env.js';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // If it's a known operational ApiError
  if (err instanceof ApiError) {
    if (err.statusCode >= 500) {
      logger.error({ err }, 'Internal Operational Error');
    }
    ApiResponse.error(res, err.statusCode, err.message, err.errors);
    return;
  }

  // Handle Mongoose CastError or ValidationError if any bypassed Zod
  if (err.name === 'CastError') {
    ApiResponse.error(res, 400, `Invalid value for parameter: ${err.path}`);
    return;
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors || {}).map((e: any) => ({
      field: e.path,
      message: e.message,
    }));
    ApiResponse.error(res, 400, 'Validation failed', errors);
    return;
  }

  // Handle SyntaxError (e.g. malformed JSON body)
  if (err instanceof SyntaxError && 'status' in err && err.status === 400) {
    ApiResponse.error(res, 400, 'Malformed JSON payload');
    return;
  }

  // Log unhandled unexpected errors
  logger.error({ err, stack: err.stack }, 'Unhandled Server Error');

  const message =
    env.NODE_ENV === 'production'
      ? 'An unexpected error occurred'
      : err.message || 'An unexpected error occurred';

  ApiResponse.error(res, 500, message);
}

