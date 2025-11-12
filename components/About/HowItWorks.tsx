"use client";
import { motion } from "framer-motion";
import MonkDBFeature from "@/components/MonkDBFeature";

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const components = [
    {
      title: "Control Plane (MonkDB Orchestrator)",
      description:
        "Securely hosted in your cloud or ours, the control plane manages cluster orchestration, provisioning, configuration, monitoring, and upgrades.",
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
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      ),
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Data Plane (Customer Environment)",
      description:
        "Deployed within the customer's own infrastructure, the data plane ensures complete data sovereignty, handling the actual storage and query execution.",
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
          <path d="M22 12H2"></path>
          <path d="M5 12V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7"></path>
          <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"></path>
        </svg>
      ),
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Multi-Modal Data Engine",
      description:
        "At the heart of MonkDB lies our Multi-Modal Engine, designed to support and unify diverse data types: Vector, Time-Series, Geo-Spatial, Document, Full-Text, Blob, and Streaming SQL.",
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
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      ),
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "AI-Native Layer",
      description:
        "Embedded within the engine, our AI-native layer enables native vector indexing & similarity search, semantic search, hybrid queries, and built-in model integration.",
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
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
  ];

  return (
    <section className="mb-16 mt-16 pt-10 md:mb-20 md:mt-20 md:pt-14 lg:pt-20">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <div className="mb-16 text-center">
          <span className="mb-4 inline-flex items-center rounded-full bg-purple-600 px-4 py-1.5 text-sm uppercase text-white">
            Architecture
          </span>
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-300">
            Unified by Design. Intelligent at Core.
          </p>
        </div>

        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {components.map((component, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="flex items-start">
                    <div className={`rounded-lg ${component.bgColor} mr-4 p-3`}>
                      <div className={`h-6 w-6 ${component.color}`}>
                        {component.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {component.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {component.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative mx-auto h-full w-full rounded-2xl border border-gray-200 bg-white p-8 shadow-lg dark:border-gray-700 dark:bg-gray-900">
              <svg
                viewBox="0 0 600 600"
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto w-full"
              >
                {/* Definitions for better rendering */}
                <defs>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.2"/>
                  </filter>
                  <linearGradient id="controlGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                  <linearGradient id="dataGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="engineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>

                {/* Control Plane */}
                <g transform="translate(80, 60)">
                  <rect
                    width="440"
                    height="100"
                    rx="16"
                    fill="#3B82F6"
                    fillOpacity="0.9"
                    stroke="#1E40AF"
                    strokeWidth="3"
                    filter="url(#shadow)"
                  />
                  <text
                    x="220"
                    y="58"
                    fill="#FFFFFF"
                    fontWeight="700"
                    fontSize="26"
                    textAnchor="middle"
                    className="select-none"
                  >
                    MonkDB Control Plane
                  </text>
                </g>

                {/* Connection Arrow */}
                <g>
                  <line
                    x1="300"
                    y1="160"
                    x2="300"
                    y2="220"
                    stroke="#3B82F6"
                    strokeWidth="4"
                    strokeDasharray="8,6"
                  />
                  <polygon points="300,230 290,215 310,215" fill="#3B82F6" />
                  <text
                    x="330"
                    y="200"
                    fill="#1E40AF"
                    fontSize="16"
                    fontWeight="700"
                  >
                    Manages
                  </text>
                </g>

                {/* Customer Environment Container */}
                <g transform="translate(40, 230)">
                  <rect
                    width="520"
                    height="310"
                    rx="16"
                    fill="#F0FDFA"
                    fillOpacity="0.5"
                    stroke="#14B8A6"
                    strokeWidth="4"
                    strokeDasharray="10,8"
                    filter="url(#shadow)"
                  />
                  <text
                    x="260"
                    y="40"
                    fill="#0F766E"
                    fontWeight="700"
                    fontSize="24"
                    textAnchor="middle"
                  >
                    Customer Environment
                  </text>

                  {/* Data Plane */}
                  <g transform="translate(60, 70)">
                    <rect
                      width="400"
                      height="100"
                      rx="16"
                      fill="#10B981"
                      fillOpacity="0.9"
                      stroke="#047857"
                      strokeWidth="3"
                      filter="url(#shadow)"
                    />
                    <text
                      x="200"
                      y="58"
                      fill="#FFFFFF"
                      fontWeight="700"
                      fontSize="26"
                      textAnchor="middle"
                    >
                      MonkDB Data Plane
                    </text>
                  </g>

                  {/* Connection to Engines */}
                  <line
                    x1="260"
                    y1="170"
                    x2="260"
                    y2="200"
                    stroke="#10B981"
                    strokeWidth="4"
                  />
                  <polygon points="260,210 250,195 270,195" fill="#10B981" />

                  {/* Multi-Modal Engines Label */}
                  <text
                    x="260"
                    y="235"
                    fill="#6B21A8"
                    fontWeight="700"
                    fontSize="20"
                    textAnchor="middle"
                  >
                    Multi-Modal Data Engines
                  </text>

                  {/* Engine Boxes */}
                  <g transform="translate(30, 245)">
                    <rect
                      width="140"
                      height="50"
                      rx="10"
                      fill="#8B5CF6"
                      fillOpacity="0.9"
                      stroke="#6B21A8"
                      strokeWidth="3"
                      filter="url(#shadow)"
                    />
                    <text
                      x="70"
                      y="32"
                      fill="#FFFFFF"
                      fontSize="20"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      Vector
                    </text>
                  </g>

                  <g transform="translate(190, 245)">
                    <rect
                      width="140"
                      height="50"
                      rx="10"
                      fill="#8B5CF6"
                      fillOpacity="0.9"
                      stroke="#6B21A8"
                      strokeWidth="3"
                      filter="url(#shadow)"
                    />
                    <text
                      x="70"
                      y="32"
                      fill="#FFFFFF"
                      fontSize="20"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      Time-Series
                    </text>
                  </g>

                  <g transform="translate(350, 245)">
                    <rect
                      width="140"
                      height="50"
                      rx="10"
                      fill="#8B5CF6"
                      fillOpacity="0.9"
                      stroke="#6B21A8"
                      strokeWidth="3"
                      filter="url(#shadow)"
                    />
                    <text
                      x="70"
                      y="32"
                      fill="#FFFFFF"
                      fontSize="20"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      Document
                    </text>
                  </g>
                </g>
              </svg>
            </div>
          </motion.div>
        </div>
        <div className="my-8 py-4">
          <MonkDBFeature />
        </div>
        <div className="mt-16 rounded-xl border border-gray-100 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Deployment Highlights
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {[
              {
                title: "Private EKS Clusters",
                description: "With restricted API access",
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
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                    <line x1="9" y1="21" x2="9" y2="9" />
                  </svg>
                ),
              },
              {
                title: "VPN Connectivity",
                description: "Secure connection to customer VPCs",
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
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                ),
              },
              {
                title: "Cloud-Agnostic",
                description: "Works across AWS, Azure, GCP, or on-prem",
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
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"></path>
                  </svg>
                ),
              },
              {
                title: "Observability",
                description: "Full CloudWatch integration & alerting",
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
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                ),
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start p-3">
                <div className="mr-3 h-6 w-6 text-blue-600 dark:text-blue-400">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
