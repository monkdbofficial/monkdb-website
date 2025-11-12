"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CompetitionMatrix = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check initial theme and set up theme listener
    const checkTheme = () => {
      if (typeof window !== "undefined") {
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          setTheme("dark");
          document.documentElement.classList.add("dark");
        } else {
          setTheme("light");
          document.documentElement.classList.remove("dark");
        }

        // Listen for theme changes
        const darkModeMediaQuery = window.matchMedia(
          "(prefers-color-scheme: dark)",
        );
        const handleThemeChange = (event) => {
          setTheme(event.matches ? "dark" : "light");
          if (event.matches) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        };

        darkModeMediaQuery.addEventListener("change", handleThemeChange);

        return () => {
          darkModeMediaQuery.removeEventListener("change", handleThemeChange);
        };
      }
    };

    handleResize();
    const cleanupTheme = checkTheme();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (cleanupTheme) cleanupTheme();
    };
  }, []);

  const databases: {
    name: string;
    icon: string;
    deployment: string;
    processor: string;
    multiModel: string; // camelCase
    hybridSearch: string; // camelCase
    htap: string;
    licensing: string;
  }[] = [
    {
      name: "MonkDB",
      icon: "🚀",
      deployment: "Cloud, On-Prem, Edge",
      processor: "Supports ARM, x86_64",
      multiModel: "V, TS, GIS, FTS, DOC, SQL, BLOB",
      hybridSearch: "Available",
      htap: "Only OLAP",
      licensing: "Flexible EULAs",
    },
    {
      name: "SingleStore",
      icon: "💾",
      deployment: "Cloud, On-Prem",
      processor: "Optimised for x86_64",
      multiModel: "V, TS, FTS, DOC, SQL",
      hybridSearch: "Available",
      htap: "Supports",
      licensing: "Flexible EULAs",
    },
    {
      name: "Snowflake",
      icon: "❄️",
      deployment: "Cloud only",
      processor: "Optimised for x86_64",
      multiModel: "V, TS, GIS, FTS, DOC, SQL",
      hybridSearch: "Available",
      htap: "Supports",
      licensing: "Consumption Based",
    },
    {
      name: "Clickhouse",
      icon: "🏠",
      deployment: "Cloud, On-Prem",
      processor: "Supports x86_64, ARM partial",
      multiModel: "V, TS, GIS, FTS, DOC, SQL",
      hybridSearch: "Not Available",
      htap: "Only OLAP",
      licensing: "Open Core + Enterprise",
    },
    {
      name: "Aerospike",
      icon: "🌟",
      deployment: "Cloud, On-Prem",
      processor: "Supports ARM, x86_64",
      multiModel: "V, GIS, FTS, DOC, KV, G",
      hybridSearch: "Available",
      htap: "Supports",
      licensing: "Open Source + Enterprise",
    },
    {
      name: "SAP HANA",
      icon: "💻",
      deployment: "Cloud, On-Prem",
      processor: "Requires in-mem arch",
      multiModel: "V, TS, GIS, FTS, DOC, SQL, BLOB",
      hybridSearch: "Not Available",
      htap: "Supports",
      licensing: "Extremely Expensive",
    },
  ];

  const features = [
    "Deployment",
    "Processor",
    "Multi-Model",
    "Hybrid Search",
    "HTAP",
    "Licensing",
  ];

  const getTextColor = (value) => {
    if (!value) return "text-gray-800 dark:text-gray-200";

    if (
      value.includes("Not Available") ||
      value.includes("Extremely Expensive")
    ) {
      return "text-red-600 dark:text-red-400 font-medium";
    }
    if (
      value.includes("Available") ||
      value.includes("Supports") ||
      value.includes("Flexible") ||
      value.includes("Open")
    ) {
      return "text-green-600 dark:text-green-400 font-medium";
    }
    return "text-gray-800 dark:text-gray-200";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 md:px-8 2xl:px-0">
        <motion.h2
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-10 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl"
        >
          The Competition Matrix
        </motion.h2>

        {!isMobile ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 md:block"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                  <motion.th
                    variants={itemVariants}
                    className="w-1/6 border-r border-gray-200 px-3 py-3 text-left text-sm font-medium dark:border-gray-700"
                  >
                    Feature
                  </motion.th>
                  {databases.map((db, index) => (
                    <motion.th
                      key={index}
                      variants={itemVariants}
                      className={`border-r border-gray-200 px-3 py-3 text-center text-sm font-medium dark:border-gray-700 ${
                        index === databases.length - 1 ? "border-r-0" : ""
                      }`}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <span className="mb-1 text-xl">{db.icon}</span>
                        <span>{db.name}</span>
                      </div>
                    </motion.th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, rowIndex) => (
                  <motion.tr
                    key={rowIndex}
                    variants={itemVariants}
                    className={`${
                      rowIndex % 2 === 0
                        ? "hover:bg-blue-50/60 dark:hover:bg-blue-900/20"
                        : "bg-gray-50 hover:bg-blue-50/60 dark:bg-gray-900 dark:hover:bg-blue-900/20"
                    }`}
                  >
                    <td className="border-r border-gray-200 px-4 py-3 text-sm font-medium text-gray-800 dark:border-gray-700 dark:text-gray-200">
                      {feature}
                    </td>
                    {databases.map((db, colIndex) => {
                      const key = feature
                        .toLowerCase()
                        .replace(/[- ]/g, "")
                        .replace("multimodel", "multiModel")
                        .replace(
                          "hybridsearch",
                          "hybridSearch",
                        ) as keyof typeof db;
                      const value = db[key];
                      return (
                        <td
                          key={colIndex}
                          className={`border-r border-gray-200 px-3 py-3 text-center text-sm dark:border-gray-700 ${
                            colIndex === databases.length - 1
                              ? "border-r-0"
                              : ""
                          } ${getTextColor(value)}`}
                        >
                          {value || "—"}
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 md:hidden"
          >
            {databases.map((db, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="overflow-hidden rounded-lg border border-gray-200 shadow-md dark:border-gray-700"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-3 text-white">
                  <div className="flex items-center justify-center">
                    <span className="mr-2 text-2xl">{db.icon}</span>
                    <h3 className="text-base font-medium">{db.name}</h3>
                  </div>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {features.map((feature, featIndex) => {
                    const key = feature
                      .toLowerCase()
                      .replace(/[\s-]/g, "")
                      .replace("multi", "multi")
                      .replace("hybrid", "hybrid") as keyof typeof db;
                    const value = db[key];
                    return (
                      <motion.div
                        key={featIndex}
                        variants={itemVariants}
                        className="flex items-center justify-between p-3"
                      >
                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                          {feature}
                        </span>
                        <span className={`text-sm ${getTextColor(value)}`}>
                          {value || "—"}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.p
          variants={itemVariants}
          className="mt-4 text-xs text-gray-600 dark:text-gray-400"
        >
          *Multi-model: Vector (V), Timeseries (TS), Geospatial (GIS), Full Text
          Search (FTS), Document JSON (DOC), Streaming SQL (SQL), Blob (BLOB),
          Key-Value (KV), Graph (G)
        </motion.p>
      </div>
    </div>
  );
};

export default CompetitionMatrix;
