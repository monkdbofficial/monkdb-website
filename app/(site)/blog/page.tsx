"use client";
import BlogData from "@/components/Blog/blogData";
import BlogItem from "@/components/Blog/BlogItem";
import SubscribeModal from "@/components/Blog/SubscribeModal";
import { BookOpen, Mail } from "lucide-react";
import { useState } from "react";

// Note: Metadata must be in a separate server component file for client components
// Create app/(site)/blog/layout.tsx for proper SEO metadata

const BlogPage = () => {
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "youtube" | "pdf">("all");

  // Filter blog data based on selected filter
  const filteredBlogs = filter === "all"
    ? BlogData
    : BlogData.filter(blog => blog.contentType === filter);

  return (
    <>
      {/* Hero Section */}
      <section className="pb-12 pt-32 lg:pb-16 lg:pt-40">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            <div className="mx-auto mb-6 inline-flex items-center justify-center rounded-full bg-primary/10 p-4 dark:bg-primary/20">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-black dark:text-white md:text-4xl lg:text-5xl">
              MONKDB Insights & Resources
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400">
              Explore our latest company updates, technical documentation, and industry insights.
              Access video content, detailed guides, and downloadable resources.
            </p>

            {/* Subscribe Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-medium text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
              >
                <Mail className="h-5 w-5" />
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1280 px-4 md:px-8 xl:px-0">
          {/* Filter Tabs */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-primary text-white shadow-lg"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-blacksection dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              All Resources
              <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {BlogData.length}
              </span>
            </button>
            <button
              onClick={() => setFilter("youtube")}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                filter === "youtube"
                  ? "bg-red-600 text-white shadow-lg"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-blacksection dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              Videos Only
              <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                filter === "youtube" ? "bg-white/20" : "bg-red-100 text-red-600 dark:bg-red-900/30"
              }`}>
                {BlogData.filter(blog => blog.contentType === "youtube").length}
              </span>
            </button>
            <button
              onClick={() => setFilter("pdf")}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
                filter === "pdf"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-blacksection dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
            >
              PDFs Only
              <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
                filter === "pdf" ? "bg-white/20" : "bg-blue-100 text-blue-600 dark:bg-blue-900/30"
              }`}>
                {BlogData.filter(blog => blog.contentType === "pdf").length}
              </span>
            </button>
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {filteredBlogs.map((blog) => (
                <BlogItem key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No resources found for this filter.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Modal */}
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={() => setIsSubscribeModalOpen(false)}
      />
    </>
  );
};

export default BlogPage;
