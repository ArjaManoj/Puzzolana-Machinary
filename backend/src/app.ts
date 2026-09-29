import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { ENV } from './config/env';
import apiRoutes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { globalApiLimiter } from './middleware/rateLimiter';
import { mongoSanitize } from './middleware/mongoSanitize';
import { xssSanitize } from './middleware/xssSanitize';
import { csrfGuard } from './middleware/csrfGuard';

export const createApp = (): Application => {
  const app = express();

  // Enable strong ETags for HTTP 304 conditional cache validation
  app.set('etag', 'strong');

  // Hardened Security Headers with Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
          imgSrc: [
            "'self'",
            'data:',
            'blob:',
            'https://images.unsplash.com',
            'https://puzzolana.com',
            'https://www.puzzolana.com',
          ],
          connectSrc: [
            "'self'",
            ENV.CORS_ORIGIN,
            'http://localhost:3000',
            'http://127.0.0.1:3000',
            'https://puzzolana.com',
          ],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      frameguard: { action: 'deny' },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      dnsPrefetchControl: { allow: false },
      hidePoweredBy: true,
      noSniff: true,
      xssFilter: true,
    })
  );

  // CORS configuration
  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const allowedOrigins = [
          ENV.CORS_ORIGIN,
          'http://localhost:3000',
          'http://127.0.0.1:3000',
          'http://localhost:5000',
          'http://127.0.0.1:5000',
          'https://puzzolana.com',
          'https://www.puzzolana.com',
        ];
        if (
          allowedOrigins.indexOf(origin) !== -1 ||
          origin.endsWith('.vercel.app') ||
          process.env.NODE_ENV === 'development' ||
          process.env.NODE_ENV === 'test'
        ) {
          return callback(null, true);
        }
        return callback(new Error('CORS policy does not allow access from this origin.'));
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
    })
  );

  // Global API Rate Limiter
  app.use('/api', globalApiLimiter);

  // High-performance response compression for responses > 512 bytes
  app.use(
    compression({
      threshold: 512,
      filter: (req, res) => {
        if (req.headers['x-no-compression']) return false;
        return compression.filter(req, res);
      },
    })
  );

  // Request Logging
  if (ENV.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (ENV.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
  }

  // Body Parsing with safe size thresholds
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Security Sanitation & CSRF Protection
  app.use(mongoSanitize);
  app.use(xssSanitize);
  app.use(csrfGuard);

  // Mount API Routes
  app.use('/api', apiRoutes);

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
