import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

// Initialize R2 client (R2 is S3-compatible)
const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
  forcePathStyle: true, // Required for R2
});

export interface UploadResult {
  url: string;
  key: string;
  size: number;
  type: string;
}

/**
 * Get the public URL for R2 bucket
 * Supports both custom domains and R2.dev subdomain
 */
function getPublicUrl(): string {
  // If custom domain is set, use it
  if (process.env.R2_PUBLIC_URL) {
    return process.env.R2_PUBLIC_URL;
  }

  // Otherwise, construct R2.dev URL from account ID
  const accountId = process.env.R2_ACCOUNT_ID;
  if (!accountId) {
    throw new Error('R2_ACCOUNT_ID or R2_PUBLIC_URL must be set');
  }

  // R2.dev public URL format: https://pub-{hash}.r2.dev
  // Note: You need to get the actual pub hash from Cloudflare dashboard
  return `https://pub-${accountId}.r2.dev`;
}

/**
 * Upload a file to Cloudflare R2
 * @param file - The file buffer to upload
 * @param fileName - The name of the file
 * @param contentType - MIME type of the file
 * @param folder - Folder in R2 bucket (e.g., 'documents' or 'videos')
 * @returns Upload result with public URL
 */
export async function uploadToR2(
  file: Buffer,
  fileName: string,
  contentType: string,
  folder: string
): Promise<UploadResult> {
  const key = `${folder}/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await r2Client.send(command);

  // Construct public URL
  const baseUrl = getPublicUrl();
  const publicUrl = `${baseUrl}/${key}`;

  return {
    url: publicUrl,
    key,
    size: file.length,
    type: contentType,
  };
}

/**
 * Generate a unique file name with timestamp
 */
export function generateFileName(originalName: string): string {
  const timestamp = Date.now();
  const sanitized = originalName.replace(/\s+/g, '-').toLowerCase();
  return `${timestamp}-${sanitized}`;
}

/**
 * Delete a file from Cloudflare R2
 * @param fileUrl - The full public URL of the file to delete
 * @returns True if successful, false otherwise
 */
export async function deleteFromR2(fileUrl: string): Promise<boolean> {
  try {
    if (!fileUrl) return false;

    // Extract the key from the URL
    // URL format: https://pub-xxx.r2.dev/folder/filename
    const urlObj = new URL(fileUrl);
    const key = urlObj.pathname.substring(1); // Remove leading slash

    if (!key) return false;

    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    });

    await r2Client.send(command);
    console.log(`Successfully deleted file from R2: ${key}`);
    return true;
  } catch (error) {
    console.error('Error deleting file from R2:', error);
    return false;
  }
}

/**
 * Delete multiple files from R2
 * @param fileUrls - Array of file URLs to delete
 */
export async function deleteMultipleFromR2(fileUrls: string[]): Promise<void> {
  const deletePromises = fileUrls
    .filter(url => url && url.trim() !== '')
    .map(url => deleteFromR2(url));

  await Promise.allSettled(deletePromises);
}
