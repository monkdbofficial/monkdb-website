"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiDocumentText, HiEye, HiStar } from "react-icons/hi";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalViews: 0,
    featuredBlogs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();

      if (data.success) {
        const blogs = data.data;
        setStats({
          totalBlogs: blogs.length,
          publishedBlogs: blogs.filter((b: any) => b.published).length,
          totalViews: blogs.reduce((acc: number, b: any) => acc + b.views, 0),
          featuredBlogs: blogs.filter((b: any) => b.featured).length,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Blogs",
      value: stats.totalBlogs,
      icon: HiDocumentText,
      color: "bg-blue-500",
    },
    {
      title: "Published",
      value: stats.publishedBlogs,
      icon: HiDocumentText,
      color: "bg-green-500",
    },
    {
      title: "Total Views",
      value: stats.totalViews,
      icon: HiEye,
      color: "bg-purple-500",
    },
    {
      title: "Featured",
      value: stats.featuredBlogs,
      icon: HiStar,
      color: "bg-yellow-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Welcome to your blog management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/dashboard/blogs/new"
            className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <div className="bg-primary p-3 rounded-lg">
              <HiDocumentText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Create New Blog
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Write a new blog post
              </p>
            </div>
          </a>
          <a
            href="/admin/dashboard/blogs"
            className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <div className="bg-primary p-3 rounded-lg">
              <HiDocumentText className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Manage Blogs
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Edit or delete existing posts
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
