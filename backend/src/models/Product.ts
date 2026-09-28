import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISpecItem {
  name: string;
  value: string;
  unit?: string;
}

export interface ISpecGroup {
  groupName: 'General' | 'Capacity' | 'Dimensions' | 'Power' | 'Performance' | 'Feed & Output' | 'Configuration' | 'Safety';
  specifications: ISpecItem[];
}

export interface IProduct extends Document {
  productId: string;
  name: string;
  slug: string;
  category: string;
  categoryName: string;
  subcategory: string;
  productFamily: string;
  modelNumber: string;
  shortDescription: string;
  fullDescription: string;
  primaryImage: string;
  galleryImages: string[];
  capacityMinTPH: number;
  capacityMaxTPH: number;
  maxFeedSizeMM: number;
  powerRatingKW: number;
  dischargeSizeMM: string;
  mobilityType: 'Stationary' | 'Track-Mounted' | 'Wheel-Mounted' | 'Skid-Mounted';
  applications: string[];
  materialsHandled: string[];
  features: string[];
  benefits: string[];
  specifications: ISpecGroup[];
  brochureUrl?: string;
  datasheetUrl?: string;
  model3dUrl?: string;
  videoUrl?: string;
  relatedProductSlugs: string[];
  seoTitle?: string;
  seoDescription?: string;
  status: 'draft' | 'review' | 'approved' | 'published' | 'archived';
  viewsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const SpecItemSchema = new Schema<ISpecItem>(
  {
    name: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
    unit: { type: String, trim: true },
  },
  { _id: false }
);

const SpecGroupSchema = new Schema<ISpecGroup>(
  {
    groupName: {
      type: String,
      required: true,
      enum: ['General', 'Capacity', 'Dimensions', 'Power', 'Performance', 'Feed & Output', 'Configuration', 'Safety'],
    },
    specifications: [SpecItemSchema],
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    categoryName: {
      type: String,
      required: true,
      trim: true,
    },
    subcategory: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    productFamily: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    modelNumber: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    fullDescription: {
      type: String,
      required: true,
      trim: true,
    },
    primaryImage: {
      type: String,
      required: true,
    },
    galleryImages: [{ type: String }],
    capacityMinTPH: {
      type: Number,
      required: true,
      default: 0,
      index: true,
    },
    capacityMaxTPH: {
      type: Number,
      required: true,
      default: 0,
      index: true,
    },
    maxFeedSizeMM: {
      type: Number,
      required: true,
      default: 0,
      index: true,
    },
    powerRatingKW: {
      type: Number,
      required: true,
      default: 0,
    },
    dischargeSizeMM: {
      type: String,
      default: '',
    },
    mobilityType: {
      type: String,
      enum: ['Stationary', 'Track-Mounted', 'Wheel-Mounted', 'Skid-Mounted'],
      default: 'Stationary',
      index: true,
    },
    applications: [{ type: String, trim: true, index: true }],
    materialsHandled: [{ type: String, trim: true, index: true }],
    features: [{ type: String, trim: true }],
    benefits: [{ type: String, trim: true }],
    specifications: [SpecGroupSchema],
    brochureUrl: { type: String },
    datasheetUrl: { type: String },
    model3dUrl: { type: String },
    videoUrl: { type: String },
    relatedProductSlugs: [{ type: String }],
    seoTitle: { type: String },
    seoDescription: { type: String },
    status: {
      type: String,
      enum: ['draft', 'review', 'approved', 'published', 'archived'],
      default: 'draft',
      index: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Indexes for high-speed filter queries in Product Finder & Comparison
ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ capacityMinTPH: 1, capacityMaxTPH: 1, status: 1 });
ProductSchema.index({ name: 'text', modelNumber: 'text', shortDescription: 'text', productFamily: 'text' });

export const ProductModel: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
