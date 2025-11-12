"use client";
import { motion } from "framer-motion";

const AboutHero = () => {
  // Enhanced animation variants matching SingleFeature style
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
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

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
      },
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { type: "spring", stiffness: 150, damping: 20 },
    },
  };

  // Professional icons for values section
  const valueIcons = {
    innovation: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
        <path d="M9 21v-1a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
      </svg>
    ),
    customer: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    enterprise: (
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
  };

  return (
    <section className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col gap-8 md:gap-12"
        >
          {/* Hero Header */}
          <motion.div variants={itemVariants} className="text-center">
            <span className="mb-4.5 inline-flex items-center rounded-full bg-meta px-4.5 py-1.5 text-metatitle uppercase text-white">
              Our Story
            </span>
            <h1 className="mb-5 mt-4 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Building the Future of{" "}
              <span className="relative inline-block">
                Data Infrastructure
                <motion.span
                  className="absolute bottom-2.5 left-0 -z-1 h-3 w-full bg-titlebg dark:bg-titlebgdark"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="max-w-c-850 mx-auto text-lg leading-relaxed"
            >
              At Movibase, our journey is deeply personal — born from decades of
              experience in enterprise systems, data management, and AI. We've
              seen firsthand how fragmented data infrastructure holds back
              innovation. MonkDB is our answer: a unified, AI-native database
              platform built to simplify, consolidate, and empower.
            </motion.p>
          </motion.div>

          {/* Mission & Vision Cards */}
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "Our Mission",
                description:
                  "To build the world's most unified, intelligent, and efficient database platform that empowers every enterprise to unlock the full value of their data — across all types, all functions, and at any scale.",
                gradient:
                  "from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800",
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
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                ),
              },
              {
                title: "Our Vision",
                description:
                  "Empower every organization — across industries and functions — with one intelligent, resilient data platform that drives innovation and growth.",
                gradient:
                  "from-green-100 to-green-50 dark:from-green-900 dark:to-green-800",
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
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <motion.div
                  className={`relative mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-tr ${item.gradient}`}
                  whileHover={{ scale: 1.1 }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0"
                    whileHover={{
                      opacity: 0.5,
                      scale: 1.2,
                      transition: { duration: 0.3 },
                    }}
                  />
                  <div className="relative z-10 h-8 w-8">{item.icon}</div>
                </motion.div>
                <motion.h3
                  className="mb-4 text-xl font-bold text-gray-900 dark:text-white"
                  whileHover={{ x: 5 }}
                >
                  {item.title}
                </motion.h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Core Values Section */}
          <h2 className="mb-6 text-center text-2xl font-bold text-black dark:text-white">
            Our Core Values
          </h2>
          <motion.div
            variants={containerVariants}
            className="grid gap-6 md:grid-cols-3"
          >
            {[
              {
                title: "Innovation First",
                description:
                  "Building cutting-edge solutions with AI-native architecture",
                color: "bg-blue-100 dark:bg-blue-900",
                textColor: "text-blue-600 dark:text-blue-400",
                icon: valueIcons.innovation,
              },
              {
                title: "Customer Success",
                description:
                  "Dedicated to delivering measurable value and outcomes",
                color: "bg-green-100 dark:bg-green-900",
                textColor: "text-green-600 dark:text-green-400",
                icon: valueIcons.customer,
              },
              {
                title: "Enterprise Grade",
                description: "Built for scale, security, and reliability",
                color: "bg-purple-100 dark:bg-purple-900",
                textColor: "text-purple-600 dark:text-purple-400",
                icon: valueIcons.enterprise,
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div
                  className={`mb-4 rounded-full ${value.color} flex h-12 w-12 items-center justify-center p-3`}
                >
                  <div className={`h-6 w-6 ${value.textColor}`}>
                    {value.icon}
                  </div>
                </div>
                <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {value.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Problem & Solution Section */}
          <div className="mt-16">
            <h2 className="mb-8 text-center text-2xl font-bold text-black dark:text-white">
              Why MonkDB?
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                variants={cardVariants}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 p-3 dark:bg-red-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-600 dark:text-red-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  The Problem
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <svg
                      className="mr-2 mt-0.5 h-5 w-5 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Siloed data systems that don't talk to each other
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mr-2 mt-0.5 h-5 w-5 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Increased infrastructure and licensing costs
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mr-2 mt-0.5 h-5 w-5 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Complex architectures with multiple layers and integrations
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mr-2 mt-0.5 h-5 w-5 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Heavy operational burden on engineering teams
                  </li>
                </ul>
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="rounded-xl border border-gray-100 bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 p-3 dark:bg-green-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                  The MonkDB Solution
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <svg
                      className="mr-2 mt-0.5 h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Truly Unified: One engine, one query layer, multiple data
                    modalities
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mr-2 mt-0.5 h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    AI-Native by Design: Embedded intelligence for search,
                    analysis & recommendations
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mr-2 mt-0.5 h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Built for Modern Workloads: From IoT to GenAI, supports
                    real-time, hybrid, and large-scale data
                  </li>
                  <li className="flex items-start">
                    <svg
                      className="mr-2 mt-0.5 h-5 w-5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Developer-Friendly: Intuitive SDKs, REST & SQL APIs, and
                    blazing-fast performance
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
