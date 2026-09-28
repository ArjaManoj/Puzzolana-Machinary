import { Request, Response, NextFunction } from 'express';

interface CacheEntry {
  body: any;
  headers: Record<string, string>;
  timestamp: number;
}

const MEMORY_CACHE = new Map<string, CacheEntry>();

/**
 * High-performance in-memory cache middleware with ETag and Cache-Control headers
 * @param ttlSeconds Time-to-live in seconds for cached response
 */
export const cacheResponse = (ttlSeconds = 60) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      next();
      return;
    }

    // Skip caching for authenticated admin requests
    if (req.headers.authorization) {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
      next();
      return;
    }

    const cacheKey = `${req.originalUrl || req.url}`;
    const cached = MEMORY_CACHE.get(cacheKey);
    const now = Date.now();

    if (cached && now - cached.timestamp < ttlSeconds * 1000) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('Cache-Control', `public, max-age=${ttlSeconds}, stale-while-revalidate=${ttlSeconds * 2}`);
      res.status(200).json(cached.body);
      return;
    }

    // Capture original json response method
    const originalJson = res.json.bind(res);

    res.json = (body: any): Response => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        MEMORY_CACHE.set(cacheKey, {
          body,
          headers: {},
          timestamp: Date.now(),
        });
        // Limit cache size to prevent memory leaks
        if (MEMORY_CACHE.size > 500) {
          const oldestKey = MEMORY_CACHE.keys().next().value;
          if (oldestKey) MEMORY_CACHE.delete(oldestKey);
        }
      }

      res.setHeader('X-Cache', 'MISS');
      res.setHeader('Cache-Control', `public, max-age=${ttlSeconds}, stale-while-revalidate=${ttlSeconds * 2}`);
      return originalJson(body);
    };

    next();
  };
};

/**
 * Clear cache helper (for testing or catalog update invalidation)
 */
export const clearCache = (): void => {
  MEMORY_CACHE.clear();
};
