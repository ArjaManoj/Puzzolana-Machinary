import rateLimit from 'express-rate-limit';

const isTestEnv = process.env.NODE_ENV === 'test';

// Global API rate limiter for broad traffic protection
export const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isTestEnv ? 20000 : 500,
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Sensitive Auth endpoint limiter (prevent brute force credential stuffing)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isTestEnv ? 20000 : 10,
  message: {
    success: false,
    message: 'Too many authentication attempts. Please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for B2B enquiry & RFQ forms to prevent automated spam
export const enquiryFormLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isTestEnv ? 20000 : 15,
  message: {
    success: false,
    message: 'Submission limit reached. Please wait before submitting another enquiry.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Analytics Telemetry beacon limiter (allow frequent page events, prevent beacon DDoS)
export const analyticsLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: isTestEnv ? 20000 : 120,
  message: {
    success: false,
    message: 'Telemetry rate limit exceeded.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Search & Typeahead rate limiter (prevent automated catalog scraping / compute exhaustion)
export const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: isTestEnv ? 20000 : 60,
  message: {
    success: false,
    message: 'Search query rate limit reached. Please pause momentarily.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Gated Drawing & Technical Datasheet access limiter
export const downloadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isTestEnv ? 20000 : 20,
  message: {
    success: false,
    message: 'Download request limit reached for this session.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
