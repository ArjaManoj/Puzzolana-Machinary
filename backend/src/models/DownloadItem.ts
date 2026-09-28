import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDownloadItem extends Document {
  downloadId: string;
  title: string;
  slug: string;
  category: 'Brochure' | 'Datasheet' | 'Technical Catalogue' | 'Manual' | 'Certificate';
  productCategory?: string;
  productModel?: string;
  fileUrl: string;
  fileSizeBytes: number;
  fileExtension: string;
  downloadCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const DownloadItemSchema = new Schema<IDownloadItem>(
  {
    downloadId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ['Brochure', 'Datasheet', 'Technical Catalogue', 'Manual', 'Certificate'],
      index: true,
    },
    productCategory: { type: String, index: true },
    productModel: { type: String },
    fileUrl: { type: String, required: true },
    fileSizeBytes: { type: Number, default: 0 },
    fileExtension: { type: String, default: 'PDF' },
    downloadCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const DownloadItemModel: Model<IDownloadItem> =
  mongoose.models.DownloadItem ||
  mongoose.model<IDownloadItem>('DownloadItem', DownloadItemSchema);
