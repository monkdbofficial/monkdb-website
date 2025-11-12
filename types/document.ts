export type Document = {
  id: number;
  title: string;
  description: string;
  category: string;
  publishDate: string;
  author: string;
  thumbnail: string;
  latestVersion: string;
  fileSize: string;
  downloadCount?: number;
};

export type DocumentVersion = {
  id: string;
  version: string;
  title: string;
  description?: string;
  pdfPath: string;
  uploadDate: string;
  uploadedBy: string;
  fileSize: string;
};
