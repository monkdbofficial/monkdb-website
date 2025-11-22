import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { uploadToR2, generateFileName } from '@/lib/r2';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const type = formData.get('type') as string; // 'document' or 'video'

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validDocTypes = ['application/pdf'];
    const validVideoTypes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo', 'video/webm'];

    if (type === 'document' && !validDocTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Only PDF files are allowed for documents' },
        { status: 400 }
      );
    }

    if (type === 'video' && !validVideoTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid video format. Allowed: MP4, MOV, AVI, WebM' },
        { status: 400 }
      );
    }

    // Validate file size (50MB for documents, 500MB for videos)
    const maxSize = type === 'document' ? 50 * 1024 * 1024 : 500 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: `File too large. Max size: ${type === 'document' ? '50MB' : '500MB'}` },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileName = generateFileName(file.name);
    const folder = type === 'document' ? 'documents' : 'videos';

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudflare R2
    const uploadResult = await uploadToR2(buffer, fileName, file.type, folder);

    return NextResponse.json({
      success: true,
      data: {
        url: uploadResult.url,
        filename: fileName,
        size: uploadResult.size,
        type: uploadResult.type,
      },
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Upload failed' },
      { status: 500 }
    );
  }
}
