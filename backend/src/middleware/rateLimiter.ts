import rateLimit from 'express-rate-limit';

// Standard API rate limiter
export const standardApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per window
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for B2B enquiry forms to prevent spam
export const enquiryFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Limit each IP to 15 submissions per 15 minutes
  message: {
    success: false,
    message: 'Submission limit reached. Please wait before submitting another enquiry.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Auth endpoint rate limiter (prevent brute force)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 login attempts per 15 mins
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
