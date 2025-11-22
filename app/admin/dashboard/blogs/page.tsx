"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HiPencil, HiTrash, HiPlus, HiEye, HiEyeOff, HiExternalLink, HiVideoCamera, HiDocument } from "react-icons/hi";
import { format } from "date-fns";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  author: string;
  published: boolean;
  featured: boolean;
  views: number;
  contentType: 'article' | 'youtube' | 'pdf';
  coverImage?: string;
  youtubeUrl?: string;
  googleDriveUrl?: string;
  documentFile?: string;
  videoFile?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (filter === 'published') return blog.published;
    if (filter === 'draft') return !blog.published;
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Blog Posts
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage all your blog posts
          </p>
        </div>
        <Link
          href="/admin/dashboard/blogs/new"
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg transition"
        >
          <HiPlus className="h-5 w-5" />
          <span>New Blog</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 font-medium transition ${
            filter === 'all'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          All ({blogs.length})
        </button>
        <button
          onClick={() => setFilter('published')}
          className={`px-4 py-2 font-medium transition ${
            filter === 'published'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Published ({blogs.filter(b => b.published).length})
        </button>
        <button
          onClick={() => setFilter('draft')}
          className={`px-4 py-2 font-medium transition ${
            filter === 'draft'
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Drafts ({blogs.filter(b => !b.published).length})
        </button>
      </div>

      {/* Blog List */}
      {filteredBlogs.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            No blogs found. Create your first blog post!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map((blog, index) => {
            // Generate thumbnail URL
            const getThumbnail = () => {
              if (blog.coverImage) return blog.coverImage;
              if (blog.contentType === 'youtube' && blog.youtubeUrl) {
                const videoIdMatch = blog.youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
                if (videoIdMatch) {
                  return `https://i.ytimg.com/vi/${videoIdMatch[1]}/hqdefault.jpg`;
                }
              }
              if (blog.contentType === 'pdf' && blog.googleDriveUrl) {
                const fileIdMatch = blog.googleDriveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
                if (fileIdMatch) {
                  return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w400`;
                }
              }
              return null;
            };

            const thumbnail = getThumbnail();

            return (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-4 p-4">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0">
                    <div className="relative w-48 h-32 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                      {thumbnail ? (
                        <Image
                          src={thumbnail}
                          alt={blog.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            // Hide image on error and show fallback
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : null}
                      {/* Fallback icon or if no thumbnail */}
                      {!thumbnail && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          {blog.contentType === 'youtube' && (
                            <HiVideoCamera className="h-12 w-12 text-gray-400" />
                          )}
                          {blog.contentType === 'pdf' && (
                            <HiDocument className="h-12 w-12 text-gray-400" />
                          )}
                          {blog.contentType === 'article' && (
                            <HiDocument className="h-12 w-12 text-gray-400" />
                          )}
                        </div>
                      )}
                      {/* Content Type Badge */}
                      <div className="absolute top-2 left-2">
                        {blog.contentType === 'youtube' && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-red-600 rounded">
                            <HiVideoCamera className="h-3 w-3" />
                            Video
                          </span>
                        )}
                        {blog.contentType === 'pdf' && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-blue-600 rounded">
                            <HiDocument className="h-3 w-3" />
                            PDF
                          </span>
                        )}
                        {blog.contentType === 'article' && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-white bg-green-600 rounded">
                            <HiDocument className="h-3 w-3" />
                            Article
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">
                            {blog.title}
                          </h2>
                          {blog.published ? (
                            <span className="px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded">
                              Published
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 text-xs font-medium text-yellow-700 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 rounded">
                              Draft
                            </span>
                          )}
                          {blog.featured && (
                            <span className="px-2 py-0.5 text-xs font-medium text-purple-700 bg-purple-100 dark:bg-purple-900 dark:text-purple-300 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                          {blog.excerpt}
                        </p>

                        {/* Resource Links */}
                        <div className="space-y-1.5 mb-3">
                          {blog.youtubeUrl && (
                            <a
                              href={blog.youtubeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 hover:underline"
                            >
                              <HiVideoCamera className="h-4 w-4" />
                              <span className="truncate">{blog.youtubeUrl}</span>
                              <HiExternalLink className="h-3 w-3 flex-shrink-0" />
                            </a>
                          )}
                          {blog.googleDriveUrl && (
                            <a
                              href={blog.googleDriveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              <HiDocument className="h-4 w-4" />
                              <span className="truncate">{blog.googleDriveUrl}</span>
                              <HiExternalLink className="h-3 w-3 flex-shrink-0" />
                            </a>
                          )}
                        </div>

                        {/* Metadata */}
                        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                          <span>By {blog.author}</span>
                          <span>•</span>
                          <span>{format(new Date(blog.createdAt), "MMM dd, yyyy")}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <HiEye className="h-3 w-3" />
                            {blog.views} views
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {blog.published && (
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="p-2 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 rounded-lg transition"
                            title="View on site"
                          >
                            <HiExternalLink className="h-5 w-5" />
                          </Link>
                        )}
                        <Link
                          href={`/admin/dashboard/blogs/edit/${blog._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                          title="Edit"
                        >
                          <HiPencil className="h-5 w-5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                          title="Delete"
                        >
                          <HiTrash className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
