"use client";
import React, { useEffect, useState } from "react";
import SingleBrand from "./SingleBrand";
import brandData from "./brandData";
import { motion, useScroll, useSpring } from "framer-motion";
import { Sparkles } from "lucide-react";

const Brands = () => {
  const [duplicatedBrands, setDuplicatedBrands] = useState(brandData);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    // Duplicate brands twice for smoother infinite scroll
    setDuplicatedBrands([...brandData, ...brandData]);
  }, []);

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

  const brandVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const marqueeVariants = {
    animate: {
      x: [-1035, 0], // Adjusted for doubled brands
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 30, // Slower for smoother effect
          ease: "linear",
        },
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative border border-x-0 border-y-[#D9E5F2] bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FC] to-[#F6F9FC] py-12 dark:border-y-[#041521] dark:bg-gradient-to-b dark:from-[#041521] dark:to-[#0A2437] md:py-16">
      {/* Progress Bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-50 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 text-center md:mb-12"
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Why Choose MonkDB
            </span>
            <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-black dark:text-white md:text-3xl lg:text-4xl">
            Trusted Features & Capabilities
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-400 md:text-base">
            Experience the power of a unified database platform built for modern enterprises
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden rounded-xl bg-white/50 py-8 backdrop-blur-sm dark:bg-black/20">
          <motion.div
            variants={marqueeVariants}
            animate="animate"
            className="flex gap-6 md:gap-16"
          >
            {duplicatedBrands.map((brand, index) => (
              <motion.div
                key={`${brand.id}-${index}`}
                variants={brandVariants}
                className="w-[180px] flex-shrink-0 md:w-[220px]"
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                <SingleBrand brand={brand} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Enhanced gradient masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#F6F9FC] via-[#F6F9FC]/80 to-transparent dark:from-[#0A2437] dark:via-[#0A2437]/80 md:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#F6F9FC] via-[#F6F9FC]/80 to-transparent dark:from-[#0A2437] dark:via-[#0A2437]/80 md:w-48" />
    </section>
  );
};

export default Brands;
