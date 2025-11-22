import mongoose, { Schema, Model } from 'mongoose';

export interface IBlog {
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  youtubeUrl?: string;
  googleDriveUrl?: string;
  documentFile?: string;
  videoFile?: string;
  contentType: 'article' | 'youtube' | 'pdf';
  author: string;
  tags: string[];
  category?: string;
  readTime?: string;
  published: boolean;
  publishedAt?: Date;
  featured: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      maxlength: [500, 'Excerpt cannot be more than 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    coverImage: {
      type: String,
      default: '',
    },
    youtubeUrl: {
      type: String,
      default: '',
    },
    googleDriveUrl: {
      type: String,
      default: '',
    },
    documentFile: {
      type: String,
      default: '',
    },
    videoFile: {
      type: String,
      default: '',
    },
    contentType: {
      type: String,
      enum: ['article', 'youtube', 'pdf'],
      default: 'article',
      required: [true, 'Content type is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      default: 'MonkDB Team',
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: '',
    },
    readTime: {
      type: String,
      default: '',
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create index for searching
BlogSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
