import rateLimit from 'express-rate-limit';

const isTestEnv = process.env.NODE_ENV === 'test';

// Standard API rate limiter
export const standardApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isTestEnv ? 10000 : 200,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for B2B enquiry forms to prevent spam
export const enquiryFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isTestEnv ? 10000 : 15,
  message: {
    success: false,
    message: 'Submission limit reached. Please wait before submitting another enquiry.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth endpoint rate limiter (prevent brute force)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isTestEnv ? 10000 : 10,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
