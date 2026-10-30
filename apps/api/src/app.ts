import express, { Express } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from './config/env.js';
import { requestLogger } from './middleware/request-logger.js';
import { apiRateLimiter } from './middleware/rate-limiter.js';
import { errorHandler } from './middleware/error-handler.js';
import { ApiResponse } from './utils/ApiResponse.js';
import { ApiError } from './utils/ApiError.js';
import { requirementRoutes } from './modules/requirements/requirement.routes.js';

export const app: Express = express();

// Security Headers
app.use(helmet());

// Cross-Origin Resource Sharing
const allowedOrigins = [
  env.CLIENT_ORIGIN,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        env.NODE_ENV !== 'production' ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }
      return callback(new Error('Blocked by CORS policy'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Idempotency-Key'],
  })
);

// Body Parsing with limit
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Logging
if (env.NODE_ENV !== 'test') {
  app.use(requestLogger);
}

// Rate Limiting
app.use('/api', apiRateLimiter);

// Health Check Endpoint
app.get('/api/v1/health', (_req, res) => {
  ApiResponse.success(res, 'API is healthy', {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Requirements API Routes
app.use('/api/v1/requirements', requirementRoutes);

// 404 Handler
app.use((_req, _res, next) => {
  next(ApiError.notFound('The requested endpoint was not found on this server'));
});

// Centralized Error Handler
app.use(errorHandler);
