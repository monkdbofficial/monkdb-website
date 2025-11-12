export type Author = {
  name: string;
  image: string;
  bio?: string;
  _id?: number | string;
  _ref?: number | string;
};

export type Blog = {
  _id: number;
  title: string;
  slug?: string;
  metadata?: string;
  body?: string;
  description?: string;
  mainImage?: any;
  pdfPath?: string;
  youtubeUrl?: string;
  googleDriveUrl?: string;
  contentType?: 'youtube' | 'pdf' | 'document';
  author?: Author;
  tags?: string[];
  publishedAt?: string;
  readTime?: string;
  thumbnail?: string;
  excerpt?: string;
};
