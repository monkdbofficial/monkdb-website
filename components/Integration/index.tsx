"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";
import { useEffect, useState } from "react";

const Integration = () => {
  const [isInView, setIsInView] = useState(false);

  // Enhanced container variants with fade-in effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  // Enhanced item variants with more dynamic animations
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 0.8,
      },
    },
    hover: {
      scale: 1.08,
      y: -8,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 0.4,
      },
    },
  };

  // Enhanced icon animations
  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, -5, 0],
      scale: [1, 1.15, 0.95, 1.05, 1],
      transition: {
        duration: 0.7,
        repeat: 1,
        repeatType: "reverse" as const,
      },
    },
  };

  // Random floating animations for each card with different timing
  const generateFloatingAnimation = (index) => ({
    y: [-((index % 3) + 3), (index % 3) + 3],
    transition: {
      duration: 2 + (index % 3) * 0.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
      delay: index * 0.2,
    },
  });

  // Features data for easier management
  const features = [
    {
      emoji: "🧠",
      title: "AI-Native by Design",
      description:
        "Purpose-built for AI workloads with integrated vector capabilities and LLM optimization",
    },
    {
      emoji: "🔗",
      title: "Unified Data Platform",
      description:
        "Single engine for multiple data models including vector, time-series, and document storage",
    },
    {
      emoji: "⚡",
      title: "High Performance",
      description:
        "1.5M+ QPS with optimized latency and horizontal scalability for enterprise workloads",
    },
    {
      emoji: "🔒",
      title: "Enterprise Security",
      description:
        "Secure deployment with zero-trust architecture and end-to-end encryption",
    },
    {
      emoji: "⚙️",
      title: "Infrastructure Optimization",
      description:
        "Consolidate multiple databases into one solution, reducing complexity and costs",
    },
    {
      emoji: "🚀",
      title: "Rapid Development",
      description:
        "Modern APIs and SDKs for all major programming languages with intuitive query interfaces",
    },
  ];

  return (
    <>
      <section className="overflow-hidden py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          onViewportEnter={() => setIsInView(true)}
          className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeader
              headerInfo={{
                title: `WHY MONKDB`,
                subtitle: `The AI-Native Unified Database`,
                description: `MonkDB integrates various data models into one platform with AI capabilities.`,
              }}
            />
          </motion.div>
        </motion.div>

        <div className="pattern-dots pattern-blue-500 pattern-bg-white pattern-size-4 pattern-opacity-10 relative z-10 mx-auto mt-12 max-w-c-1154 px-4 md:mt-16 md:px-8 lg:mt-20 xl:px-0">
          <div className="absolute -top-3/4 left-0 right-0 -z-1 mx-auto h-full w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Image
                width={1200}
                height={400}
                sizes="100vw"
                src="/images/shape/shape-dotted-light.svg"
                alt="Dotted Background"
                className="dark:hidden"
                style={{ position: "static" }}
              />
              <Image
                fill
                src="/images/shape/shape-dotted-dark.svg"
                alt="Dotted Background"
                className="hidden dark:block"
              />
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                whileHover="hover"
                animate={{
                  y: [0, -5, 0], // Reduced floating animation range
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                    delay: index * 0.2,
                  },
                }}
                className="w-full"
              >
                <div className="h-full rounded-xl border border-gray-100 bg-white/80 p-5 backdrop-blur-sm transition-all duration-300 hover:border-blue-200 dark:border-gray-700 dark:bg-gray-800/80 dark:hover:border-blue-800">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className="mb-3 inline-block rounded-xl bg-gradient-to-br from-blue-50 to-white p-4 shadow-md dark:from-gray-700 dark:to-gray-800"
                  >
                    <div className="text-3xl sm:text-4xl">{feature.emoji}</div>
                  </motion.div>
                  <h3 className="mt-3 text-base font-bold text-gray-800 dark:text-gray-100 sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 sm:text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Integration;
