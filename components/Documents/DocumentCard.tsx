"use client";

import { Document } from "@/types/document";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FileText, Download, Calendar, User, Tag } from "lucide-react";

const DocumentCard = ({ document }: { document: Document }) => {
  const { id, title, description, category, publishDate, author, thumbnail, latestVersion, fileSize, downloadCount } =
    document;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: -20,
        },
        visible: {
          opacity: 1,
          y: 0,
        },
      }}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="animate_top group relative overflow-hidden rounded-lg border border-stroke bg-white shadow-solid-3 transition-all hover:shadow-solid-4 dark:border-strokedark dark:bg-blacksection dark:hover:shadow-none"
    >
      <Link href={`/documents/${id}`} className="relative block aspect-[368/239] overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Category Badge */}
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            <Tag className="h-3 w-3" />
            {category}
          </span>
        </div>
        {/* Version Badge */}
        <div className="absolute right-4 top-4 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            v{latestVersion}
          </span>
        </div>
      </Link>

      <div className="p-6">
        {/* Metadata */}
        <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(publishDate)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            <span>{author}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-black transition-colors duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
          <Link href={`/documents/${id}`}>{title}</Link>
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-stroke pt-4 dark:border-strokedark">
          <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5" />
              <span>{fileSize}</span>
            </div>
            {downloadCount && (
              <div className="flex items-center gap-1.5">
                <Download className="h-3.5 w-3.5" />
                <span>{downloadCount.toLocaleString()}</span>
              </div>
            )}
          </div>

          <Link
            href={`/documents/${id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-all hover:gap-3 dark:text-primary"
          >
            View Document
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DocumentCard;
