import { Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env';

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

const ALLOWED_ORIGIN_PATTERNS = [
  ENV.CORS_ORIGIN,
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5000',
  'http://127.0.0.1:5000',
  'https://puzzolana.com',
  'https://www.puzzolana.com',
];

function isOriginAllowed(origin: string): boolean {
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    const originNormalized = `${originUrl.protocol}//${originUrl.host}`;
    
    return ALLOWED_ORIGIN_PATTERNS.some((allowed) => {
      try {
        const allowedUrl = new URL(allowed);
        return originNormalized === `${allowedUrl.protocol}//${allowedUrl.host}`;
      } catch {
        return false;
      }
    });
  } catch {
    return false;
  }
}

/**
 * CSRF and Origin Guard middleware.
 * Verifies that state-mutating requests (POST, PUT, PATCH, DELETE) originate
 * from trusted application domains.
 */
export const csrfGuard = (req: Request, res: Response, next: NextFunction): void => {
  // Only inspect mutating methods
  if (!MUTATING_METHODS.has(req.method.toUpperCase())) {
    return next();
  }

  // Bypass in test environment unless an explicit test origin header is set
  if (process.env.NODE_ENV === 'test' && !req.headers.origin && !req.headers.referer) {
    return next();
  }

  const origin = (req.headers.origin as string) || (req.headers.referer as string);

  // If an origin is provided, it must be in the allowed whitelist
  if (origin && !isOriginAllowed(origin)) {
    res.status(403).json({
      success: false,
      message: 'Forbidden: Cross-Site Request Forgery (CSRF) validation failed. Origin not permitted.',
    });
    return;
  }

  next();
};
