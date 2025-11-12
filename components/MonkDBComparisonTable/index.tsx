"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const MonkDBComparisonTable = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeRow, setActiveRow] = useState(null);

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

  const workloadCategories = [
    {
      name: "Timeseries Store",
      icon: "📊",
      monkDB:
        "Distributed SQL and real-time time series ingestion with built-in TS functions. Seamlessly combine geospatial and time series data. Ideal for unified workloads with complete context.",
      competition:
        "InfluxDB 2.0 offers speed and scale, but its non-SQL interface adds complexity and limits support for non-numeric data. TimescaleDB, while purpose-built, enforces strict schemas and lacks native distribution, making it unsuitable for some production-grade scenarios.",
    },
    {
      name: "Vector Store",
      icon: "🔍",
      monkDB:
        "Supports hybrid queries combining vector and full-text search, with KNN and similarity search over a SQL interface. However, limited to HNSW indexing, restricting flexibility for varied vector workloads.",
      competition:
        "Qdrant lacks SQL support and isn't multi-model. Milvus is operationally heavy, relying on components like etcd and Pulsar. Weaviate imposes opinionated data models, with inconsistent query performance.",
    },
    {
      name: "Geospatial Store",
      icon: "🌍",
      monkDB:
        "Supports all GeoJSON shapes with distributed SQL and real-time ingestion. Enables seamless Geo + Time Series workloads. However, lacks native spatial visualization.",
      competition:
        "PostGIS is limited by single-node architecture and struggles with large-scale ingestion. Oracle is costly and enforces vendor lock-in. ESRI's ArcGIS uses proprietary formats and expensive licenses, with restricted SQL capabilities.",
    },
    {
      name: "Document/JSON Store",
      icon: "📄",
      monkDB:
        "Manage JSON as SQL with built-in distributed querying. Delivers high ingest and query performance, with support for complex aggregations and joins.",
      competition:
        "Joins in MonkDB are cumbersome, often forcing complex aggregations and manual sharding. CouchDB struggles with query and ingestion performance at scale.",
    },
    {
      name: "Full Text Search Store",
      icon: "🔎",
      monkDB:
        "Joins, filters, and scoring in a single query. Lighter than ELK, with SQL-native full-text and structured search. A unified engine for both search and analytics.",
      competition:
        "Elasticsearch's DSL is complex for non-developers and the system is heavy to manage. It's not SQL-first. OpenSearch lags in advanced NLP/ML features and retains the same DSL complexity.",
    },
    {
      name: "Blob Store Store",
      icon: "💾",
      monkDB:
        "Natively integrated with MonkDB for low-latency record access. Simple REST-based blob API. While it lacks features like versioning, tiering, and ACLs, workarounds exist. Built on MonkDB's internal shard replication.",
      competition:
        "S3 has higher latency than DB-native access and lacks integrated DB semantics. Azure Blob Storage faces similar issues despite good performance, and adds a complex permissions model. The costs increase rapidly for ever growing data.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
      },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    },
  };

  const highlightMonkAdvantages = (text) => {
    const positiveKeywords = [
      "Distributed SQL",
      "real-time",
      "seamlessly combine",
      "built-in",
      "high ingest",
      "native",
      "ideal",
      "unified",
    ];

    let highlightedText = text;
    positiveKeywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        '<span class="text-blue-600 dark:text-blue-400 font-medium">$1</span>',
      );
    });

    return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const highlightCompetitionWeaknesses = (text) => {
    const negativeKeywords = [
      "lacks",
      "limited",
      "complex",
      "cumbersome",
      "struggles",
      "costly",
      "expensive",
      "unsuitable",
      "heavy",
      "not SQL-first",
      "restricted",
    ];

    let highlightedText = text;
    negativeKeywords.forEach((keyword) => {
      const regex = new RegExp(`(${keyword})`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        '<span class="text-red-600 dark:text-red-400 font-medium">$1</span>',
      );
    });

    return <div dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12 md:px-6 2xl:px-0">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <div className="mb-3 inline-block rounded-full bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-1.5 text-sm font-medium text-white">
            DATABASE COMPARISON
          </div>
          <h2 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
            Why{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              MonkDB
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-300 md:text-base">
            Feature comparison across different workload types
          </p>
        </motion.div>

        {!isMobile ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="hidden overflow-hidden rounded-lg border border-gray-200 shadow-lg dark:border-gray-700 md:block"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                  <motion.th
                    variants={itemVariants}
                    className="w-1/5 border-r border-gray-200 px-3 py-3 text-left text-sm font-medium dark:border-gray-700"
                  >
                    Data Workload
                  </motion.th>
                  <motion.th
                    variants={itemVariants}
                    className="w-2/5 border-r border-gray-200 px-4 py-4 text-center dark:border-gray-700"
                  >
                    <span className="text-base font-semibold">MonkDB</span>
                  </motion.th>
                  <motion.th
                    variants={itemVariants}
                    className="w-2/5 px-4 py-4 text-center"
                  >
                    <span className="text-base font-semibold">Competition</span>
                  </motion.th>
                </tr>
              </thead>
              <tbody>
                {workloadCategories.map((category, index) => (
                  <motion.tr
                    key={index}
                    variants={itemVariants}
                    className={`${
                      index % 2 === 0
                        ? "hover:bg-blue-50/60 dark:hover:bg-blue-900/20"
                        : "hover:bg-blue-50/60 dark:hover:bg-blue-900/20"
                    } transition-colors duration-200`}
                    onMouseEnter={() => setActiveRow(index)}
                    onMouseLeave={() => setActiveRow(null)}
                    whileHover={{
                      backgroundColor:
                        theme === "light"
                          ? "rgba(239, 246, 255, 0.8)"
                          : "rgba(30, 64, 175, 0.2)",
                      transition: { duration: 0.2 },
                    }}
                  >
                    <motion.td
                      variants={cellVariants}
                      className={`px-4 py-6 text-center font-medium transition-all duration-300 ${
                        activeRow === index
                          ? "bg-blue-700 text-white"
                          : "bg-blue-600 text-white"
                      } border-b border-gray-200 dark:border-gray-700`}
                    >
                      <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex flex-col items-center justify-center"
                      >
                        <span className="mb-1.5 text-xl">{category.icon}</span>
                        <span className="text-sm">{category.name}</span>
                      </motion.div>
                    </motion.td>
                    <motion.td
                      variants={cellVariants}
                      className="border-b border-r border-gray-200 px-4 py-4 text-sm text-gray-800 dark:border-gray-700 dark:text-gray-200"
                    >
                      {highlightMonkAdvantages(category.monkDB)}
                    </motion.td>
                    <motion.td
                      variants={cellVariants}
                      className="border-b border-gray-200 px-4 py-4 text-sm text-gray-800 dark:border-gray-700 dark:text-gray-200"
                    >
                      {highlightCompetitionWeaknesses(category.competition)}
                    </motion.td>
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
            className="grid grid-cols-1 gap-6 md:hidden"
          >
            {workloadCategories.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="overflow-hidden rounded-lg border border-gray-200 shadow-md transition-all duration-300 dark:border-gray-700"
                whileHover={{ y: -2, transition: { duration: 0.2 } }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-white">
                  <div className="flex items-center justify-center">
                    <span className="mr-2 text-2xl">{category.icon}</span>
                    <h3 className="text-lg font-medium">{category.name}</h3>
                  </div>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  <motion.div variants={cellVariants} className="p-4">
                    <h4 className="mb-2 flex items-center text-sm font-medium text-blue-600 dark:text-blue-400">
                      <span className="mr-1.5">✅</span>
                      <span>MonkDB Advantages</span>
                    </h4>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {highlightMonkAdvantages(category.monkDB)}
                    </p>
                  </motion.div>
                  <motion.div variants={cellVariants} className="p-4">
                    <h4 className="mb-2 flex items-center text-sm font-medium text-red-600 dark:text-red-400">
                      <span className="mr-1.5">⚠️</span>
                      <span>Competition Limitations</span>
                    </h4>
                    <p className="text-sm text-gray-800 dark:text-gray-200">
                      {highlightCompetitionWeaknesses(category.competition)}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MonkDBComparisonTable;
