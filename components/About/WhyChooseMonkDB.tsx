"use client";
import { motion } from "framer-motion";
import MonkDBFeature from "@/components/MonkDBFeature";

const WhyChooseMonkDB = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const pillars = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      title: "AI-Native by Design",
      description:
        "Built ground-up to support AI workloads — not retrofitted. Native vector + traditional data.",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 11a9 9 0 0 1 9 9"></path>
          <path d="M4 4a16 16 0 0 1 16 16"></path>
          <circle cx="5" cy="19" r="2"></circle>
        </svg>
      ),
      title: "Unified & Multi-Modal",
      description:
        "One engine for vector, time-series, document, geo-spatial, blob, streaming & full-text data.",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="13 17 18 12 13 7"></polyline>
          <polyline points="6 17 11 12 6 7"></polyline>
        </svg>
      ),
      title: "Blazing Fast & Scalable",
      description:
        "Achieves up to 2.5M QMS with ANN + HNSW. Distributed OLAP performance with real-time query speeds.",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      title: "Enterprise-Ready",
      description:
        "On-prem deployment, VPN-secured, IAM-integrated, and audit-compliant.",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      ),
      title: "No More Tech Sprawl",
      description:
        "Collapse 3–5 databases & data pipelines into one. Save infra cost, dev time, and operational overhead.",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
  ];

  return (
    <section className="mb-16 mt-16 pt-10 md:mb-20 md:mt-20 md:pt-14 lg:pt-20">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <div className="flex flex-col items-center gap-12 md:flex-row">
          <div className="md:w-1/2">
            <span className="mb-4 inline-flex items-center rounded-full bg-green-600 px-4 py-1.5 text-sm uppercase text-white">
              Why Choose Us
            </span>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
              What Makes MonkDB The Best Choice For Your Enterprise
            </h2>
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              MonkDB delivers on the promise of a truly unified database—without
              compromising on speed, scalability, or operational readiness.
              Designed from the ground up for real-world enterprise workloads.
            </p>

            <div className="mb-8 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                <div className="mb-1 text-3xl font-bold text-blue-600 dark:text-blue-400">
                  1.5M+
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  QMS with ANN search
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                <div className="mb-1 text-3xl font-bold text-green-600 dark:text-green-400">
                  &lt;2-4 ms
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Latency under load
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                <div className="mb-1 text-3xl font-bold text-purple-600 dark:text-purple-400">
                  3-5x
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Infrastructure reduction
                </p>
              </div>
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700">
                <div className="mb-1 text-3xl font-bold text-amber-600 dark:text-amber-400">
                  7+
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Data types supported
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <button className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700">
                Request Demo
              </button>
            </motion.div>
          </div>

          <div className="w-full md:w-1/2">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex w-full rounded-xl border border-gray-100 bg-white p-5 shadow-md transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-900"
                >
                  <div className={`rounded-lg ${pillar.bgColor} mr-4 flex-shrink-0 p-3`}>
                    <div className={`h-6 w-6 ${pillar.color}`}>
                      {pillar.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMonkDB;
