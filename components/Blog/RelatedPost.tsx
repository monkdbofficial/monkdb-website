import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Blog } from "@/types/blog";
import { Video, FileText, Calendar } from "lucide-react";

interface RelatedPostProps {
  blog: Blog;
}

const RelatedPost = ({ blog }: RelatedPostProps) => {
  // Generate thumbnail dynamically - memoized to prevent recalculation
  const imageSrc = useMemo(() => {
    // If manual thumbnail is provided, use it
    if (blog.thumbnail) return blog.thumbnail;

    // For YouTube videos, use YouTube's thumbnail API
    if (blog.contentType === "youtube" && blog.youtubeUrl) {
      const videoIdMatch = blog.youtubeUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
      if (videoIdMatch) {
        const videoId = videoIdMatch[1];
        return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
      }
    }

    // For Google Drive PDFs, use Google Drive thumbnail API
    if (blog.contentType === "pdf" && blog.googleDriveUrl) {
      const fileIdMatch = blog.googleDriveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
      }
    }

    // Fallback
    return null;
  }, [blog.thumbnail, blog.contentType, blog.youtubeUrl, blog.googleDriveUrl]);

  // Check if using fallback
  const isFallback = !imageSrc;

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group block overflow-hidden rounded-lg border border-stroke bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-strokedark dark:bg-blacksection"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        {isFallback ? (
          // Fallback: Show professional icon instead of image
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 to-blue-500/20 dark:from-primary/10 dark:to-blue-500/10">
            {blog.contentType === "youtube" ? (
              <Video className="h-12 w-12 text-red-600 dark:text-red-500" strokeWidth={1.5} />
            ) : blog.contentType === "pdf" ? (
              <FileText className="h-12 w-12 text-blue-600 dark:text-blue-500" strokeWidth={1.5} />
            ) : (
              <FileText className="h-12 w-12 text-primary dark:text-primary" strokeWidth={1.5} />
            )}
          </div>
        ) : (
          <Image
            fill
            src={imageSrc}
            alt={blog.title}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            priority={false}
            quality={85}
          />
        )}
        {/* Content Type Badge */}
        <div className="absolute left-3 top-3">
          {blog.contentType === "youtube" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-600 px-2.5 py-1 text-xs font-medium text-white">
              <Video className="h-3 w-3" />
              Video
            </span>
          )}
          {blog.contentType === "pdf" && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-medium text-white">
              <FileText className="h-3 w-3" />
              PDF
            </span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h5 className="mb-2 line-clamp-2 text-base font-semibold text-black transition-colors duration-300 group-hover:text-primary dark:text-white dark:group-hover:text-primary">
          {blog.title}
        </h5>
        {blog.publishedAt && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="h-3 w-3" />
            <span>
              {new Date(blog.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default RelatedPost;
