"use client";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, Clock, User, Tag, Video, FileText, Mail, ArrowLeft } from "lucide-react";
import SharePost from "@/components/Blog/SharePost";
import RelatedPost from "@/components/Blog/RelatedPost";
import SubscribeModal from "@/components/Blog/SubscribeModal";
import { useState, use, useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { generateArticleSchema, generateVideoSchema, generateBreadcrumbSchema } from "@/lib/seo";
import { Blog } from "@/types/blog";


// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Helper function to convert Google Drive link to embed URL
const getGoogleDriveEmbedUrl = (url: string): string => {
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (fileIdMatch) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }
  return url;
};

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [blog, setBlog] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { slug } = use(params);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  // Update page title and meta dynamically
  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | MonkDB Blog`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", blog.description || blog.title);
      }
    }
  }, [blog]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/slug/${slug}`);
      const data = await response.json();

      if (data.success) {
        setBlog(data.data);
        fetchRelatedBlogs(data.data.tags);
      } else {
        setBlog(null);
      }
    } catch (error) {
      console.error("Error fetching blog:", error);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedBlogs = async (tags: string[]) => {
    try {
      const response = await fetch("/api/blogs?published=true&limit=6");
      const data = await response.json();

      if (data.success) {
        const related = data.data
          .filter((b: any) => b.slug !== slug && b.tags.some((tag: string) => tags.includes(tag)))
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error("Error fetching related blogs:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!blog) {
    notFound();
  }

  const youtubeVideoId = blog.youtubeUrl
    ? getYouTubeVideoId(blog.youtubeUrl)
    : null;
  const googleDriveEmbedUrl = blog.googleDriveUrl
    ? getGoogleDriveEmbedUrl(blog.googleDriveUrl)
    : null;

  // Generate structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: blog.title, url: `/blog/${blog.slug}` },
  ]);

  const articleSchema = generateArticleSchema({
    title: blog.title,
    description: blog.description || blog.title,
    image: blog.coverImage || "/images/og-image.png",
    datePublished: blog.publishedAt || blog.createdAt || new Date().toISOString(),
    dateModified: blog.publishedAt || blog.createdAt || new Date().toISOString(),
    author: blog.author || "MonkDB Team",
    url: `/blog/${blog.slug}`,
  });

  const videoSchema =
    blog.contentType === "youtube" && blog.youtubeUrl
      ? generateVideoSchema({
          name: blog.title,
          description: blog.description || blog.title,
          thumbnailUrl: `https://i.ytimg.com/vi/${youtubeVideoId}/maxresdefault.jpg`,
          uploadDate: blog.publishedAt || blog.createdAt || new Date().toISOString(),
          contentUrl: blog.youtubeUrl,
        })
      : null;

  return (
    <>
      {/* Structured Data for SEO */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {videoSchema && (
        <Script
          id="video-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
        />
      )}

      {/* Hero Section */}
      <section className="pb-10 pt-32 lg:pb-15 lg:pt-40">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="mx-auto max-w-4xl">
            {/* Content Type Badge and Back Button */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              {/* Content Type Badge */}
              <div>
                {blog.contentType === "youtube" && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400">
                    <Video className="h-4 w-4" />
                    Video Resource
                  </span>
                )}
                {blog.contentType === "pdf" && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <FileText className="h-4 w-4" />
                    Technical Document
                  </span>
                )}
              </div>

              {/* Back Button */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Resources
              </Link>
            </div>

            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold text-black dark:text-white md:text-4xl lg:text-5xl">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              {blog.author && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{blog.author}</span>
                </div>
              )}
              {(blog.publishedAt || blog.createdAt) && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              )}
              {blog.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{blog.readTime}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-8 flex flex-wrap items-center gap-2">
                <Tag className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary dark:bg-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {blog.description && (
              <p className="mb-10 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {blog.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-20 lg:pb-25">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="mx-auto max-w-4xl">
            {/* YouTube Video Player */}
            {youtubeVideoId && (
              <div className="mb-12 overflow-hidden rounded-2xl shadow-2xl">
                <div className="relative" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute left-0 top-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1`}
                    title={blog.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Uploaded Video Player */}
            {(blog as any).videoFile && !blog.youtubeUrl && (
              <div className="mb-12 overflow-hidden rounded-2xl shadow-2xl bg-black">
                <video
                  className="w-full"
                  controls
                  controlsList="nodownload"
                >
                  <source src={(blog as any).videoFile} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {/* Google Drive PDF Viewer */}
            {googleDriveEmbedUrl && (
              <div className="mb-12 overflow-hidden rounded-2xl shadow-2xl">
                <div className="relative bg-gray-100 dark:bg-gray-800" style={{ minHeight: "800px" }}>
                  <iframe
                    className="h-full w-full"
                    src={googleDriveEmbedUrl}
                    title={blog.title}
                    style={{ minHeight: "800px" }}
                    allow="autoplay"
                    loading="lazy"
                  />
                </div>
                <div className="bg-gray-50 p-4 dark:bg-gray-900">
                  <a
                    href={blog.googleDriveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    Open in Google Drive
                  </a>
                </div>
              </div>
            )}

            {/* Uploaded PDF Viewer */}
            {(blog as any).documentFile && !blog.googleDriveUrl && (
              <div className="mb-12 overflow-hidden rounded-2xl shadow-2xl">
                <div className="relative bg-gray-100 dark:bg-gray-800" style={{ minHeight: "800px" }}>
                  <iframe
                    className="h-full w-full border-0"
                    src={`${(blog as any).documentFile}#toolbar=1&navpanes=1&scrollbar=1`}
                    title={blog.title}
                    style={{ minHeight: "800px" }}
                    allow="fullscreen"
                  />
                </div>
                <div className="bg-gray-50 p-4 dark:bg-gray-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Having trouble viewing?
                    </span>
                  </div>
                  <a
                    href={(blog as any).documentFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
                  >
                    <FileText className="h-4 w-4" />
                    Open PDF Directly
                  </a>
                </div>
              </div>
            )}

            {/* Body Content */}
            {blog.content && (
              <div
                className="prose prose-lg max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            )}

            {/* Share Section */}
            <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
              <SharePost />
            </div>

            {/* Subscribe CTA */}
            <div className="mt-12 rounded-2xl border border-gray-200 bg-gradient-to-br from-primary/5 to-blue-500/5 p-8 text-center dark:border-gray-800 dark:from-primary/10 dark:to-blue-500/10">
              <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-3 dark:bg-primary/20">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-black dark:text-white md:text-2xl">
                Stay Updated
              </h3>
              <p className="mb-6 text-gray-600 dark:text-gray-400">
                Subscribe to get the latest MONKDB updates, guides, and resources delivered to your inbox.
              </p>
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-medium text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
              >
                <Mail className="h-5 w-5" />
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pb-20 lg:pb-25">
          <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-10 text-2xl font-bold text-black dark:text-white md:text-3xl">
                Related Resources
              </h2>
              <div className="grid gap-7.5 md:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.map((post) => (
                  <RelatedPost key={post._id} blog={post} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Subscribe Modal */}
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
      />
    </>
  );
}
