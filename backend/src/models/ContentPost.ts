import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContentPost extends Document {
  postId: string;
  slug: string;
  title: string;
  type: 'blog' | 'article' | 'csr' | 'news';
  author: string;
  category: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  tags: string[];
  readTimeMinutes: number;
  isPublished: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ContentPostSchema = new Schema<IContentPost>(
  {
    postId: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['blog', 'article', 'csr', 'news'],
      default: 'article',
      index: true,
    },
    author: { type: String, default: 'Puzzolana Engineering Bureau' },
    category: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String, required: true },
    tags: [{ type: String }],
    readTimeMinutes: { type: Number, default: 5 },
    isPublished: { type: Boolean, default: true, index: true },
    publishedAt: { type: Date, default: Date.now, index: true },
  },
  {
    timestamps: true,
  }
);

export const ContentPostModel: Model<IContentPost> =
  mongoose.models.ContentPost ||
  mongoose.model<IContentPost>('ContentPost', ContentPostSchema);
