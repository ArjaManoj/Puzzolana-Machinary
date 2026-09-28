import mongoose from 'mongoose';
import { AnalyticsEventModel } from '../models/AnalyticsEvent';
import { Logger } from '../utils/logger';

export const AnalyticsService = {
  recordEvent: async (
    eventType: 'page_view' | 'product_view' | 'search' | 'finder_run' | 'compare' | 'quote_click' | 'quote_submit' | 'download',
    path: string,
    metadata?: Record<string, unknown>,
    ip?: string,
    userAgent?: string
  ) => {
    if (mongoose.connection.readyState === 1) {
      try {
        await AnalyticsEventModel.create({
          eventType,
          path,
          metadata,
          ipHash: ip ? Buffer.from(ip).toString('base64').substring(0, 12) : undefined, // Privacy conscious pseudonymization
          userAgent,
          timestamp: new Date(),
        });
      } catch (err) {
        Logger.warn('Failed to record analytics event', { error: (err as Error).message });
      }
    }
  },
};
