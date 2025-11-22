"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import RichTextEditor from "@/components/RichTextEditor";
import FileUpload from "@/components/FileUpload";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    excerpt: "",
    content: "",
    coverImage: "",
    youtubeUrl: "",
    googleDriveUrl: "",
    documentFile: "",
    videoFile: "",
    contentType: "article" as 'article' | 'youtube' | 'pdf',
    author: "MonkDB Team",
    tags: "",
    category: "",
    readTime: "",
    published: false,
    featured: false,
  });
  const [useFileUpload, setUseFileUpload] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
        }),
      });

      if (response.ok) {
        router.push("/admin/dashboard/blogs");
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Create New Blog Post
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Write and publish your blog content
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  title: e.target.value,
                  slug: generateSlug(e.target.value),
                });
              }}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white outline-none"
              placeholder="Enter blog title"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white outline-none"
              placeholder="blog-url-slug"
            />
          </div>

          {/* Content Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content Type *
            </label>
            <select
              required
              value={formData.contentType}
              onChange={(e) =>
                setFormData({ ...formData, contentType: e.target.value as 'article' | 'youtube' | 'pdf' })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white outline-none"
            >
              <option value="article">Article</option>
              <option value="youtube">YouTube Video</option>
              <option value="pdf">PDF Document</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white outline-none"
              placeholder="Complete guide to designing effective schemas for your MONKDB applications."
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Main description shown on blog cards (max 500 chars)
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Excerpt *
            </label>
            <textarea
              required
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white outline-none"
              placeholder="Brief description of the blog post"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content *
            </label>
            <RichTextEditor
              content={formData.content}
              onChange={(content) =>
                setFormData({ ...formData, content })
              }
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              value={formData.coverImage}
              onChange={(e) =>
                setFormData({ ...formData, coverImage: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white outline-none"
              placeholder="https://example.com/image.jpg"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Optional - Will auto-generate from YouTube or Google Drive if not provided
            </p>
          </div>

          {/* YouTube Video - URL or Upload */}
          {formData.contentType === "youtube" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Video Source *
                </label>
                <button
                  type="button"
                  onClick={() => setUseFileUpload(!useFileUpload)}
                  className="text-xs text-primary hover:underline"
                >
                  {useFileUpload ? "Use YouTube URL instead" : "Upload video file instead"}
                </button>
              </div>

              {useFileUpload ? (
                <FileUpload
                  type="video"
                  label=""
                  currentFile={formData.videoFile}
                  onUploadComplete={(url) =>
                    setFormData({ ...formData, videoFile: url, youtubeUrl: "" })
                  }
                />
              ) : (
                <div>
                  <input
                    type="url"
                    required={formData.contentType === "youtube" && !formData.videoFile}
                    value={formData.youtubeUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, youtubeUrl: e.target.value, videoFile: "" })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white outline-none"
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Paste YouTube video URL
                  </p>
                </div>
              )}
            </div>
          )}

          {/* PDF Document - URL or Upload */}
          {formData.contentType === "pdf" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Document Source *
                </label>
                <button
                  type="button"
                  onClick={() => setUseFileUpload(!useFileUpload)}
                  className="text-xs text-primary hover:underline"
                >
                  {useFileUpload ? "Use Google Drive URL instead" : "Upload PDF file instead"}
                </button>
              </div>

              {useFileUpload ? (
                <FileUpload
                  type="document"
                  label=""
                  currentFile={formData.documentFile}
                  onUploadComplete={(url) =>
                    setFormData({ ...formData, documentFile: url, googleDriveUrl: "" })
                  }
                />
              ) : (
                <div>
                  <input
                    type="url"
                    required={formData.contentType === "pdf" && !formData.documentFile}
                    value={formData.googleDriveUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, googleDriveUrl: e.target.value, documentFile: "" })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white outline-none"
                    placeholder="https://drive.google.com/file/d/..."
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Paste Google Drive PDF URL
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white outline-none"
              placeholder="Tutorial, Guide, Best Practices, etc."
            />
          </div>

          {/* Read Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Read/Watch Time *
            </label>
            <input
              type="text"
              required
              value={formData.readTime}
              onChange={(e) =>
                setFormData({ ...formData, readTime: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white outline-none"
              placeholder="30 min read (or 15 min watch for videos)"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Example: "30 min read" or "15 min watch"
            </p>
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Author *
            </label>
            <input
              type="text"
              required
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white outline-none"
              placeholder="Author name"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white outline-none"
              placeholder="tag1, tag2, tag3"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Separate tags with commas
            </p>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) =>
                  setFormData({ ...formData, published: e.target.checked })
                }
                className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Publish immediately
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) =>
                  setFormData({ ...formData, featured: e.target.checked })
                }
                className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Mark as featured
              </span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}
