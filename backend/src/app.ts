import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { ENV } from './config/env';
import apiRoutes from './routes';
import { errorHandler } from './middleware/errorHandler';

export const createApp = (): Application => {
  const app = express();

  // Enable strong ETags for HTTP 304 conditional cache validation
  app.set('etag', 'strong');

  // Security headers with Helmet
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // CORS configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const allowedOrigins = [ENV.CORS_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000'];
        if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
          return callback(null, true);
        }
        return callback(new Error('CORS policy does not allow access from this origin.'));
      },
      credentials: true,
    })
  );

  // High-performance compression for responses > 512 bytes
  app.use(
    compression({
      threshold: 512,
      filter: (req, res) => {
        if (req.headers['x-no-compression']) return false;
        return compression.filter(req, res);
      },
    })
  );

  // Logging
  if (ENV.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (ENV.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
  }

  // Body Parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Mount API Routes
  app.use('/api', apiRoutes);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
