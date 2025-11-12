import SidebarLink from "@/components/Docs/SidebarLink";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MonkDB Documentation - AI-Native Unified Database",
  description:
    "Documentation for MonkDB - The AI-Native Unified Database Platform",
};

export default function DocsPage() {
  return (
    <>
      <section className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            {/* Sidebar */}
            <div className="w-full px-4 lg:w-1/4">
              <div className="sticky top-[74px] rounded-lg border border-gray-200 bg-white p-4 shadow-lg transition-all dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-6">
                  <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                    Documentation
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Learn about MonkDB's features, architecture, and
                    capabilities
                  </p>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <SidebarLink />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full px-4 lg:w-3/4">
              <div className="blog-details blog-details-docs rounded-lg border border-gray-200 bg-white px-8 py-11 shadow-lg dark:border-gray-700 dark:bg-gray-900 sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
                <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white lg:text-4xl">
                  Welcome to MonkDB Documentation
                </h1>

                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    MonkDB is an AI-native unified database that supports
                    Vector, Time-Series, Geo-Spatial, Blob Store, Document,
                    Full-Text Search, and Streaming SQL — all in a single,
                    high-performance engine.
                  </p>

                  <h2>Getting Started</h2>
                  <p>
                    Learn how MonkDB can help simplify your data infrastructure,
                    reduce operational overhead, and enable AI-powered
                    applications at scale.
                  </p>

                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                      <h3 className="mb-3 text-lg font-semibold">
                        🚀 Quick Start Guide
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Get up and running with MonkDB in minutes
                      </p>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                      <h3 className="mb-3 text-lg font-semibold">
                        📚 Core Concepts
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Learn about MonkDB's architecture and features
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
