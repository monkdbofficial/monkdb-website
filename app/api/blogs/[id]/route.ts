import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { deleteMultipleFromR2 } from '@/lib/r2';

// GET single blog
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { id } = await params;

    // Get the current blog to check if it's being published for the first time
    const currentBlog = await Blog.findById(id);

    // Set publishedAt date if blog is being published for the first time
    if (body.published && !currentBlog?.publishedAt && !body.publishedAt) {
      body.publishedAt = new Date();
    }

    const blog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = await params;

    // First, get the blog to extract file URLs
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Collect all uploaded file URLs to delete from R2
    const filesToDelete: string[] = [];

    if (blog.documentFile && blog.documentFile.includes('r2.dev')) {
      filesToDelete.push(blog.documentFile);
    }

    if (blog.videoFile && blog.videoFile.includes('r2.dev')) {
      filesToDelete.push(blog.videoFile);
    }

    if (blog.coverImage && blog.coverImage.includes('r2.dev')) {
      filesToDelete.push(blog.coverImage);
    }

    // Delete the blog from database
    await Blog.findByIdAndDelete(id);

    // Delete associated files from R2 (don't wait for completion)
    if (filesToDelete.length > 0) {
      deleteMultipleFromR2(filesToDelete).catch(err => {
        console.error('Error deleting files from R2:', err);
        // Don't fail the blog deletion if file deletion fails
      });
    }

    return NextResponse.json({
      success: true,
      data: {},
      message: 'Blog and associated files deleted successfully'
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
