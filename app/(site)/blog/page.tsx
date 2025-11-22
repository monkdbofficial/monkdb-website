"use client";
import BlogItem from "@/components/Blog/BlogItem";
import SubscribeModal from "@/components/Blog/SubscribeModal";
import { Mail, Search, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Blog } from "@/types/blog";

const BlogPage = () => {
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "youtube" | "pdf">("all");
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]); // Store ALL blogs
  const [displayedBlogs, setDisplayedBlogs] = useState<Blog[]>([]); // Blogs currently displayed
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const [totalPdfs, setTotalPdfs] = useState(0);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch total counts on mount
  useEffect(() => {
    fetchTotalCounts();
  }, []);

  // Fetch blogs when search changes
  useEffect(() => {
    setCurrentPage(1);
    setAllBlogs([]);
    setDisplayedBlogs([]);
    fetchBlogs(1, debouncedSearch, false);
  }, [debouncedSearch]);

  const fetchTotalCounts = async () => {
    try {
      // Fetch all published blogs to get accurate counts
      const response = await fetch('/api/blogs?published=true&limit=1000');
      const data = await response.json();

      if (data.success) {
        const allPublishedBlogs = data.data;
        setTotalVideos(allPublishedBlogs.filter((blog: Blog) => blog.contentType === "youtube").length);
        setTotalPdfs(allPublishedBlogs.filter((blog: Blog) => blog.contentType === "pdf").length);
      }
    } catch (error) {
      console.error("Error fetching total counts:", error);
    }
  };

  const fetchBlogs = async (page: number, search: string, append: boolean) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      let url = `/api/blogs?published=true&page=${page}&limit=6`;
      if (search.trim()) {
        url += `&search=${encodeURIComponent(search.trim())}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        if (append) {
          setAllBlogs(prev => [...prev, ...data.data]);
          setDisplayedBlogs(prev => [...prev, ...data.data]);
        } else {
          setAllBlogs(data.data);
          setDisplayedBlogs(data.data);
        }
        setHasMore(data.pagination.hasMore);
        setTotalCount(data.pagination.totalCount);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    fetchBlogs(currentPage + 1, debouncedSearch, true);
  };

  // Filter blogs based on selected filter (client-side)
  const filteredBlogs = filter === "all"
    ? displayedBlogs
    : displayedBlogs.filter(blog => blog.contentType === filter);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="text-center">
            {/* Title */}
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              MONKDB Insights & Resources
            </h1>
            <p className="mx-auto mb-9 max-w-[714px] font-medium md:text-lg">
              Explore our latest company updates, technical documentation, and industry insights.
            </p>
          </div>

          {/* Search and Subscribe Row */}
          <div className="mx-auto max-w-[1154px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              {/* Search Bar */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search blogs, videos, or documents..."
                  className="w-full rounded-full border border-stroke bg-white px-6 py-3 pr-11 font-medium text-black outline-none transition-all focus:border-primary dark:border-strokedark dark:bg-blacksection dark:text-white"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {searchQuery !== debouncedSearch && loading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  ) : (
                    <Search className="h-5 w-5 text-waterloo" />
                  )}
                </button>
              </div>

              {/* Subscribe Button */}
              <button
                onClick={() => setIsSubscribeModalOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-primary px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-primaryho"
              >
                <Mail className="h-5 w-5" />
                <span>Subscribe</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="pb-20 lg:pb-25 xl:pb-30">
        <div className="mx-auto max-w-c-1280 px-4 md:px-8 xl:px-0">
          {/* Results Count */}
          {debouncedSearch && (
            <div className="mb-7.5 text-center">
              <p className="font-medium text-black dark:text-white">
                Found <span className="text-primary">{totalCount}</span> result{totalCount !== 1 ? 's' : ''} for "{debouncedSearch}"
              </p>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-4.5">
            <button
              onClick={() => setFilter("all")}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-medium ${
                filter === "all"
                  ? "bg-primary text-white"
                  : "border border-stroke bg-white text-black dark:border-strokedark dark:bg-blacksection dark:text-white"
              }`}
            >
              All Resources
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                filter === "all"
                  ? "bg-white/20 text-white"
                  : "bg-gray-2 text-black dark:bg-btndark dark:text-white"
              }`}>
                {totalCount}
              </span>
            </button>

            <button
              onClick={() => setFilter("youtube")}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-medium ${
                filter === "youtube"
                  ? "bg-primary text-white"
                  : "border border-stroke bg-white text-black dark:border-strokedark dark:bg-blacksection dark:text-white"
              }`}
            >
              Videos
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                filter === "youtube"
                  ? "bg-white/20 text-white"
                  : "bg-gray-2 text-black dark:bg-btndark dark:text-white"
              }`}>
                {totalVideos}
              </span>
            </button>

            <button
              onClick={() => setFilter("pdf")}
              className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-medium ${
                filter === "pdf"
                  ? "bg-primary text-white"
                  : "border border-stroke bg-white text-black dark:border-strokedark dark:bg-blacksection dark:text-white"
              }`}
            >
              Documents
              <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                filter === "pdf"
                  ? "bg-white/20 text-white"
                  : "bg-gray-2 text-black dark:bg-btndark dark:text-white"
              }`}>
                {totalPdfs}
              </span>
            </button>
          </div>

          {/* Blog Grid */}
          {filteredBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
                {filteredBlogs.map((blog, index) => (
                  <BlogItem key={`${blog._id}-${index}`} blog={blog} />
                ))}
              </div>

              {/* Load More Button */}
              {filter === "all" && hasMore && (
                <div className="mt-12.5 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2.5 rounded-full bg-primary px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-primaryho disabled:opacity-50"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More ({allBlogs.length} of {totalCount})
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* All Loaded Message */}
              {filter === "all" && !hasMore && totalCount > 0 && (
                <div className="mt-12.5 text-center">
                  <p className="font-medium text-black dark:text-white">
                    ✓ You've viewed all {totalCount} blog{totalCount !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg font-medium text-black dark:text-white">
                {debouncedSearch ? `No results found for "${debouncedSearch}"` : "No resources found."}
              </p>
              {debouncedSearch && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setDebouncedSearch("");
                  }}
                  className="mt-4 font-medium text-primary hover:underline"
                >
                  Clear search
                </button>
              )}
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
