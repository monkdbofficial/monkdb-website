"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Brain,
  Zap,
  Clock,
  FileJson,
  MapPin,
  Search,
  Package,
  Smartphone,
  Cpu,
  Activity,
  TrendingUp,
  Bot,
  Sparkles,
  Plug,
  CircuitBoard,
} from "lucide-react";
import ConnectionLines from "./ConnectionLines";
import sec3_v13 from "../../public/images/logo/sec3_v13.png";

const MonkDBFeature = () => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  // Features data with lucide-react icons
  const featuresData = [
    {
      name: "Vector",
      description: "Store and query vector embeddings",
      Icon: Brain,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      name: "Streaming SQL",
      description: "Real-time SQL query processing",
      Icon: Zap,
      color: "text-yellow-600 dark:text-yellow-400",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
    },
    {
      name: "Timeseries",
      description: "Efficient time-based data storage",
      Icon: Clock,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      name: "Document/JSON",
      description: "Flexible document storage",
      Icon: FileJson,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      name: "Geospatial",
      description: "Location-based data and queries",
      Icon: MapPin,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
    {
      name: "Full Text Search",
      description: "Advanced search capabilities",
      Icon: Search,
      color: "text-indigo-600 dark:text-indigo-400",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20",
    },
    {
      name: "Blob Store",
      description: "Large binary object storage",
      Icon: Package,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      wide: true,
    },
  ];

  // Input sources data with lucide-react icons
  const inputSources = [
    {
      name: "Apps",
      Icon: Smartphone,
      description: "Mobile & Web Applications",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "IoT & Edge",
      Icon: Cpu,
      description: "Connected Devices",
      color: "text-green-600 dark:text-green-400",
    },
    {
      name: "Streams",
      Icon: Activity,
      description: "Real-time Data Flows",
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  // Output destinations data with lucide-react icons
  const outputDestinations = [
    {
      name: "Analytics",
      Icon: TrendingUp,
      description: "Business Intelligence",
      color: "text-emerald-600 dark:text-emerald-400",
    },
    {
      name: "Search",
      Icon: Search,
      description: "Instant Results",
      color: "text-indigo-600 dark:text-indigo-400",
    },
    {
      name: "AI Apps",
      Icon: Bot,
      description: "ML-Powered Solutions",
      color: "text-pink-600 dark:text-pink-400",
    },
    {
      name: "& more",
      Icon: Sparkles,
      description: "Endless Possibilities",
      color: "text-yellow-600 dark:text-yellow-400",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          controls.start("visible");
          setTimeout(() => setAnimationComplete(true), 500);
        }
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="relative overflow-hidden py-12 lg:py-16">
      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="relative mb-16 text-center"
        >
          <div className="absolute inset-0 -z-10">
            <div className="h-full w-full bg-gradient-radial from-blue-50/50 to-transparent dark:from-blue-900/20" />
          </div>
          <h2 className="relative mb-4 text-3xl font-bold text-black dark:text-white xl:text-hero">
            Optimized Architecture
            <span className="relative ml-2 inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
              for Seamless Data Flow
            </span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Efficient architecture for superior data management
          </p>
        </motion.div>

        {/* Main Diagram */}
        <div className="relative mt-10">
          <div className="flow-diagram relative min-h-[400px]">
            {" "}
            {/* Added min-height to ensure space for lines */}
            {/* Connection Lines */}
            <ConnectionLines
              currentMode={theme || "light"}
              animationComplete={animationComplete}
              inputSources={inputSources}
              outputDestinations={outputDestinations}
            />
            {/* Desktop Layout */}
            <div className="hidden md:flex md:min-h-[400px] md:items-center md:justify-between md:gap-2 lg:gap-4">
              {/* Left Column - Input Sources */}
              <div className="input-group flex w-[22%] flex-col space-y-3">
                {inputSources.map((source, index) => {
                  const { Icon } = source;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`input-item group relative transform rounded-lg bg-white p-3 text-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-gray-800 ${
                        isVisible
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-20 opacity-0"
                      } border border-gray-200 dark:border-gray-700`}
                      style={{ transitionDelay: `${150 * index}ms` }}
                    >
                      <div className="mb-2 flex justify-center">
                        <Icon
                          className={`h-6 w-6 transition-transform duration-200 group-hover:scale-110 ${source.color}`}
                        />
                      </div>
                      <h4 className="text-xs font-semibold text-black dark:text-white">
                        {source.name}
                      </h4>
                    </motion.div>
                  );
                })}
              </div>

              {/* Middle Column 1 - pgWire/SDK */}
              <motion.div
                variants={itemVariants}
                className="connector-group relative flex w-[15%] items-center justify-center"
              >
                <div
                  className={`connector-item relative transform rounded-lg border-2 border-blue-300 bg-white p-3 text-center shadow-md dark:border-blue-700 dark:bg-gray-800 ${
                    isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
                  }`}
                >
                  <div className="mb-2 flex justify-center">
                    <CircuitBoard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-xs font-semibold text-black dark:text-white">
                    PG Wire/SDK
                  </h4>
                </div>
              </motion.div>

              {/* Middle Column 2 - MonkDB */}
              <motion.div
                variants={itemVariants}
                className="database-group relative w-[35%]"
              >
                <div
                  className={`database-item relative transform rounded-xl bg-gradient-to-br from-white to-[#F6F9FC] p-4 text-center shadow-xl dark:from-gray-800 dark:to-gray-900 ${
                    isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  } border-2 border-blue-200 transition-all duration-300 hover:shadow-2xl dark:border-blue-800`}
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 transform items-center justify-center rounded-full bg-gradient-to-r from-[#F6F9FC] to-[#EDF2F7] text-xl font-bold text-black shadow-lg transition-transform duration-200 hover:scale-110 dark:text-white">
                    <img
                      src={sec3_v13.src}
                      alt="Sec3 Logo"
                      className="h-8 w-8"
                    />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-black dark:text-white">
                    MonkDB
                  </h3>
                  <div className="grid grid-cols-2 gap-1.5">
                    {featuresData.map((feature, index) => {
                      const { Icon } = feature;
                      return (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className={`group rounded-lg bg-white p-2 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-gray-800 ${
                            feature.wide ? "col-span-2" : ""
                          } border border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 ${feature.bgColor}`}
                        >
                          <div className="mb-1 flex justify-center">
                            <Icon
                              className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${feature.color}`}
                            />
                          </div>
                          <h4 className="text-[10px] font-semibold text-black dark:text-white">
                            {feature.name}
                          </h4>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Output Destinations */}
              <div className="output-group flex w-[22%] flex-col space-y-3">
                {outputDestinations.map((dest, index) => {
                  const { Icon } = dest;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`output-item group relative transform rounded-lg bg-white p-3 text-center shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg dark:bg-gray-800 ${
                        isVisible
                          ? "translate-x-0 opacity-100"
                          : "translate-x-20 opacity-0"
                      } border border-gray-200 dark:border-gray-700`}
                      style={{ transitionDelay: `${150 * index}ms` }}
                    >
                      <div className="mb-2 flex justify-center">
                        <Icon
                          className={`h-6 w-6 transition-transform duration-200 group-hover:scale-110 ${dest.color}`}
                        />
                      </div>
                      <h4 className="text-xs font-semibold text-black dark:text-white">
                        {dest.name}
                      </h4>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            {/* Mobile Layout */}
            <div className="flex flex-col space-y-8 md:hidden">
              {/* Input Sources Row */}
              <div className="input-group-mobile flex justify-around">
                {inputSources.map((source, index) => {
                  const { Icon } = source;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`input-item-mobile group relative transform rounded-lg bg-white p-2 text-center shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800 ${
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "-translate-y-10 opacity-0"
                      } w-[28%] border border-gray-200 dark:border-gray-700`}
                      style={{ transitionDelay: `${150 * index}ms` }}
                    >
                      <div className="mb-1 flex justify-center">
                        <Icon
                          className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${source.color}`}
                        />
                      </div>
                      <h4 className="text-xs font-semibold text-black dark:text-white">
                        {source.name}
                      </h4>
                    </motion.div>
                  );
                })}
              </div>

              {/* PG Wire */}
              <motion.div
                variants={itemVariants}
                className="connector-group-mobile relative mx-auto w-1/2"
              >
                <div
                  className={`connector-item-mobile relative mx-auto transform rounded-lg border-2 border-blue-300 bg-white p-2 text-center shadow-md dark:border-blue-700 dark:bg-gray-800 ${
                    isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
                  }`}
                >
                  <div className="mb-1 flex justify-center">
                    <CircuitBoard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="text-xs font-semibold text-black dark:text-white">
                    PG Wire
                  </h4>
                </div>
              </motion.div>

              {/* MonkDB */}
              <motion.div
                variants={itemVariants}
                className="database-group-mobile relative mx-auto w-5/6"
              >
                <div
                  className={`database-item-mobile relative mx-auto transform rounded-xl bg-gradient-to-br from-white to-gray-50 p-3 text-center shadow-lg dark:from-gray-800 dark:to-gray-900 ${
                    isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
                  } border-2 border-blue-100 dark:border-blue-900`}
                >
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white dark:bg-blue-700">
                    <span>M</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-black dark:text-white">
                    MonkDB
                  </h3>
                  <div className="grid grid-cols-2 gap-1.5">
                    {featuresData.map((feature, index) => {
                      const { Icon } = feature;
                      return (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className={`group rounded-lg bg-white p-2 shadow-sm transition-all duration-200 hover:shadow-md dark:bg-gray-800 ${
                            feature.wide ? "col-span-2" : ""
                          } border border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600 ${feature.bgColor}`}
                        >
                          <div className="mb-1 flex justify-center">
                            <Icon
                              className={`h-3.5 w-3.5 transition-transform duration-200 group-hover:scale-110 ${feature.color}`}
                            />
                          </div>
                          <h4 className="text-[10px] font-semibold text-black dark:text-white">
                            {feature.name}
                          </h4>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Output Destinations Row */}
              <div className="output-group-mobile flex justify-around">
                {outputDestinations.map((dest, index) => {
                  const { Icon } = dest;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`output-item-mobile group relative transform rounded-lg bg-white p-2 text-center shadow-md transition-all duration-300 hover:shadow-lg dark:bg-gray-800 ${
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-10 opacity-0"
                      } w-[22%] border border-gray-200 dark:border-gray-700`}
                      style={{ transitionDelay: `${150 * index}ms` }}
                    >
                      <div className="mb-1 flex justify-center">
                        <Icon
                          className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${dest.color}`}
                        />
                      </div>
                      <h4 className="text-[10px] font-semibold text-black dark:text-white">
                        {dest.name}
                      </h4>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default MonkDBFeature;
