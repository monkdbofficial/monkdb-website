"use client";
import { motion } from "framer-motion";

const KeyFeaturesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const featureIcons = {
    unified: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    performance: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    security: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    streaming: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
        <circle cx="12" cy="20" r="1" />
      </svg>
    ),
    developer: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    useCases: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="4" x2="10" y2="4" />
        <line x1="20" y1="8" x2="9" y2="8" />
        <line x1="21" y1="12" x2="8" y2="12" />
        <line x1="21" y1="16" x2="8" y2="16" />
        <line x1="20" y1="20" x2="9" y2="20" />
        <path d="M5 8V4H4c-1 0-2 .5-2 2s1 2 2 2h1z" />
        <path d="M5 20v-4H4c-1 0-2 .5-2 2s1 2 2 2h1z" />
        <path d="M5 16V8" />
      </svg>
    ),
    observability: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    deployment: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="21 8 21 21 3 21 3 8" />
        <rect x="1" y="3" width="22" height="5" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </svg>
    ),
  };

  const features = [
    {
      icon: featureIcons.unified,
      title: "Unified Data Engine",
      description:
        "Store and query multiple data types — Vector, Time-Series, Geospatial, Blob, Document, Full-Text, Streaming SQL — in one platform.",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      icon: featureIcons.performance,
      title: "High Performance & Scalability",
      description:
        "Optimized for low-latency, real-time analytics. Handles millions of QPS for vector and time-series queries.",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
    {
      icon: featureIcons.security,
      title: "Enterprise-Grade Security",
      description:
        "On-premises deployment with zero-trust architecture. Site-to-site VPN, IAM controls, and full data isolation.",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      icon: featureIcons.streaming,
      title: "Streaming SQL Engine",
      description:
        "Ingest, query, and act on real-time data using SQL. Built-in support for event-driven and streaming workloads.",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      icon: featureIcons.developer,
      title: "Developer First",
      description:
        "SDKs in Python, TypeScript, and more. REST API, SQL interface, and intuitive schema design.",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
    {
      icon: featureIcons.useCases,
      title: "Built for Enterprise Use Cases",
      description:
        "Serves multi-functional needs: operations, finance, HR, risk, security, and more. Replaces 3–5 siloed tools.",
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/30",
    },
    {
      icon: featureIcons.observability,
      title: "Observability & DevOps Ready",
      description:
        "Native integration with CloudWatch, Prometheus, Grafana. Metrics, logs, and alerts out of the box.",
      color: "text-cyan-600 dark:text-cyan-400",
      bgColor: "bg-cyan-100 dark:bg-cyan-900/30",
    },
    {
      icon: featureIcons.deployment,
      title: "Flexible Deployment",
      description:
        "Private EKS-based control plane for orchestration. Works across AWS, Azure, GCP, and on-prem Kubernetes clusters.",
      color: "text-teal-600 dark:text-teal-400",
      bgColor: "bg-teal-100 dark:bg-teal-900/30",
    },
  ];

  return (
    <section className="mb-16 mt-16 pt-10 md:mb-20 md:mt-20 md:pt-14 lg:pt-20">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <div className="mb-12 text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-blue-600 px-4 py-1.5 text-sm uppercase text-white">
            Features
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            MonkDB — Key Features
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Our unified AI-native database platform brings together diverse data
            models with powerful built-in capabilities
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
            >
              <div
                className={`rounded-lg ${feature.bgColor} mb-4 inline-flex p-3`}
              >
                <div className={`h-6 w-6 ${feature.color}`}>{feature.icon}</div>
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
