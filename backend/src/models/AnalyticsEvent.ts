import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnalyticsEvent extends Document {
  eventType: 'page_view' | 'product_view' | 'search' | 'finder_run' | 'compare' | 'quote_click' | 'quote_submit' | 'download';
  path: string;
  metadata?: Record<string, unknown>;
  ipHash?: string;
  userAgent?: string;
  timestamp: Date;
}

const AnalyticsEventSchema = new Schema<IAnalyticsEvent>(
  {
    eventType: {
      type: String,
      required: true,
      enum: ['page_view', 'product_view', 'search', 'finder_run', 'compare', 'quote_click', 'quote_submit', 'download'],
      index: true,
    },
    path: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    ipHash: { type: String },
    userAgent: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: false,
  }
);

// TTL index to automatically expire analytics data after 365 days
AnalyticsEventSchema.index({ timestamp: 1 }, { expireAfterSeconds: 365 * 24 * 60 * 60 });

export const AnalyticsEventModel: Model<IAnalyticsEvent> =
  mongoose.models.AnalyticsEvent ||
  mongoose.model<IAnalyticsEvent>('AnalyticsEvent', AnalyticsEventSchema);
