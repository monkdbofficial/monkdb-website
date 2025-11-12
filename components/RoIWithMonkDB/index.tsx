"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const RoIWithMonkDB = () => {
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

  // Animation variants
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

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const connectorVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        delay: 0.5,
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, delay: 0.3 },
    },
  };

  const floatVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
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
          Return on Investment with MonkDB
        </motion.h2>

        <div className="relative">
          <svg
            className="absolute inset-0 h-full w-full"
            style={{ zIndex: 1 }}
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
          >
            {/* Main horizontal line */}
            <motion.line
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              x1="150"
              y1="300" // Moved to center
              x2="1050"
              y2="300" // Moved to center
              className="stroke-gray-400 dark:stroke-gray-500"
              strokeWidth="2"
            />

            {/* Vertical connectors - adjusted to not cross */}
            <motion.line
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              x1="400"
              y1="220" // Adjusted
              x2="400"
              y2="380" // Adjusted
              className="stroke-gray-400 dark:stroke-gray-500"
              strokeWidth="2"
            />

            <motion.line
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              x1="710"
              y1="220" // Adjusted
              x2="710"
              y2="380" // Adjusted
              className="stroke-gray-400 dark:stroke-gray-500"
              strokeWidth="2"
            />

            <motion.line
              variants={lineVariants}
              initial="hidden"
              animate="visible"
              x1="950"
              y1="220" // Adjusted
              x2="950"
              y2="380" // Adjusted
              className="stroke-gray-400 dark:stroke-gray-500"
              strokeWidth="2"
            />

            {/* Curved connectors - adjusted positioning */}
            <motion.path
              variants={connectorVariants}
              initial="hidden"
              animate="visible"
              d="M150,300 Q150,450 350,450" // Adjusted curve
              fill="transparent"
              className="stroke-gray-400 dark:stroke-gray-500"
              strokeWidth="2"
            />

            <motion.path
              variants={connectorVariants}
              initial="hidden"
              animate="visible"
              d="M1050,300 Q1050,450 850,450" // Adjusted curve
              fill="transparent"
              className="stroke-gray-400 dark:stroke-gray-500"
              strokeWidth="2"
            />
          </svg>

          <div className="relative z-10 mb-24 flex justify-between px-3">
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-40 text-center"
            >
              <motion.div
                variants={floatVariants}
                animate="visible"
                className="mx-auto mb-2 rounded-full bg-blue-50 p-3 dark:bg-blue-900/30"
              >
                <svg
                  className="mx-auto h-8 w-8 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Significant Cost
                <br />
                Advantage
              </h3>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-40 text-center"
            >
              <motion.div
                variants={floatVariants}
                animate="visible"
                className="mx-auto mb-2 rounded-full bg-blue-50 p-3 dark:bg-blue-900/30"
              >
                <svg
                  className="mx-auto h-8 w-8 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Enterprise-Grade
                <br />
                Performance
              </h3>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-40 text-center"
            >
              <motion.div
                variants={floatVariants}
                animate="visible"
                className="mx-auto mb-2 rounded-full bg-blue-50 p-3 dark:bg-blue-900/30"
              >
                <svg
                  className="mx-auto h-8 w-8 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Operational
                <br />
                Excellence
              </h3>
            </motion.div>

            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-40 text-center"
            >
              <motion.div
                variants={floatVariants}
                animate="visible"
                className="mx-auto mb-2 rounded-full bg-blue-50 p-3 dark:bg-blue-900/30"
              >
                <svg
                  className="mx-auto h-8 w-8 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                AI & Real-Time
                <br />
                Analytics Ready
              </h3>
            </motion.div>
          </div>

          <div className="relative z-10 mx-auto mb-12 flex flex-col gap-6 md:flex-row md:gap-8">
            {/* Before MonkDB Column */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full rounded-lg shadow-lg md:w-1/2"
            >
              <div className="rounded-t-lg bg-gradient-to-r from-slate-700 to-slate-900 p-4 text-center">
                <h3 className="text-lg font-bold text-white">Before MonkDB</h3>
              </div>

              <div className="flex flex-col divide-y divide-gray-200 rounded-b-lg bg-white text-gray-800 dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <motion.div
                  variants={itemVariants}
                  className="flex justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <h4 className="font-medium">Licensing</h4>
                  <p className="text-right text-sm text-gray-600 dark:text-gray-300">
                    Multiple Vendors
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <h4 className="font-medium">Data Management</h4>
                  <p className="text-right text-sm text-gray-600 dark:text-gray-300">
                    Different protocols
                    <br />
                    increasing lead time
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <h4 className="font-medium">DevOps</h4>
                  <p className="text-right text-sm text-gray-600 dark:text-gray-300">
                    Complex tuning &
                    <br />
                    infrastructure requirements
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <h4 className="font-medium">Data Movement</h4>
                  <p className="text-right text-sm text-gray-600 dark:text-gray-300">
                    Complex & fragile
                    <br />
                    transformation pipelines
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <h4 className="font-medium">AI Integration</h4>
                  <p className="text-right text-sm text-gray-600 dark:text-gray-300">
                    Fragmented approach
                    <br />
                    with limited capabilities
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* After MonkDB Column */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="w-full rounded-lg shadow-lg md:w-1/2"
            >
              <div className="rounded-t-lg bg-gradient-to-r from-blue-600 to-blue-800 p-4 text-center">
                <h3 className="text-lg font-bold text-white">After MonkDB</h3>
              </div>

              <div className="flex flex-col divide-y divide-gray-200 rounded-b-lg bg-white text-gray-800 dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-200">
                <motion.div
                  variants={itemVariants}
                  className="flex justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <h4 className="font-medium">Licensing</h4>
                  <p className="text-right text-sm text-blue-700 dark:text-blue-400">
                    <span className="font-semibold">Single license</span>, ~60%
                    reduced overhead
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <h4 className="font-medium">Data Management</h4>
                  <p className="text-right text-sm text-blue-700 dark:text-blue-400">
                    <span className="font-semibold">Unified pgWire SQL</span>{" "}
                    protocol
                    <br />
                    for faster deployment
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <h4 className="font-medium">DevOps</h4>
                  <p className="text-right text-sm text-blue-700 dark:text-blue-400">
                    <span className="font-semibold">Auto-sharding</span>,
                    commodity hardware,
                    <br />
                    <span className="font-semibold">~80% cost savings</span>
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <h4 className="font-medium">Data Movement</h4>
                  <p className="text-right text-sm text-blue-700 dark:text-blue-400">
                    <span className="font-semibold">
                      SQL-based transformations
                    </span>
                    <br />
                    eliminate ETL overhead
                  </p>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-between p-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <h4 className="font-medium">AI Integration</h4>
                  <p className="text-right text-sm text-blue-700 dark:text-blue-400">
                    <span className="font-semibold">
                      Unified vector & text search
                    </span>
                    <br />
                    with leading model integrations
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.7, delay: 0.5 }}
            viewport={{ once: true }}
            className="relative z-10 mt-12 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-6 shadow-md dark:from-blue-900/20 dark:to-blue-800/20"
          >
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Up to 60% TCO Reduction
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Consolidate your database infrastructure with MonkDB
                  </p>
                </div>
              </div>

              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-gray-800"
              >
                Request ROI Analysis
              </motion.button> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoIWithMonkDB;
