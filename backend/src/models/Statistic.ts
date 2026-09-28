import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStatistic extends Document {
  key: string;
  value: number;
  suffix?: string;
  label: string;
  source: string;
  lastUpdatedDate: string;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

const StatisticSchema = new Schema<IStatistic>(
  {
    key: { type: String, required: true, unique: true, index: true },
    value: { type: Number, required: true, min: 1 }, // Must be non-zero to prevent inaccurate 0 displays
    suffix: { type: String, default: '+' },
    label: { type: String, required: true },
    source: { type: String, required: true },
    lastUpdatedDate: { type: String, required: true },
    isActive: { type: Boolean, default: true, index: true },
    displayOrder: { type: Number, default: 0, index: true },
  },
  {
    timestamps: true,
  }
);

export const StatisticModel: Model<IStatistic> =
  mongoose.models.Statistic ||
  mongoose.model<IStatistic>('Statistic', StatisticSchema);
