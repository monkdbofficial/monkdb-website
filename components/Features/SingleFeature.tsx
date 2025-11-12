import React from "react";
import { Feature } from "@/types/feature";
import Image from "next/image";
import { motion } from "framer-motion";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, description, highlights } = feature;

  // Enhanced animation variants
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

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        delay: 0.2,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: "spring", stiffness: 400 },
    },
  };

  const highlightVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <motion.div
      className="rounded-xl border border-gray-100 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { type: "spring", stiffness: 150, damping: 20 },
      }}
    >
      <motion.div
        className="flex flex-col space-y-5"
        variants={containerVariants}
      >
        <motion.div
          variants={iconVariants}
          whileHover="hover"
          className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-tr from-blue-100 to-blue-50 p-3 dark:from-blue-900 dark:to-blue-800"
        >
          <motion.div
            className="absolute inset-0 bg-blue-200 opacity-0 dark:bg-blue-700"
            whileHover={{
              opacity: 0.5,
              scale: 1.2,
              transition: { duration: 0.3 },
            }}
          />
          {typeof icon === "string" ? (
            <Image
              src={icon}
              alt={title}
              width={36}
              height={36}
              className="relative z-10 text-blue-600 dark:text-blue-400"
            />
          ) : (
            <div className="relative z-10 text-blue-600 dark:text-blue-400">
              {icon}
            </div>
          )}
        </motion.div>

        <motion.h3
          variants={itemVariants}
          className="text-xl font-bold text-gray-900 dark:text-white"
          whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
        >
          {title}
        </motion.h3>

        <motion.p
          variants={itemVariants}
          className="text-gray-600 dark:text-gray-300"
        >
          {description}
        </motion.p>

        {highlights && (
          <motion.ul className="mt-2 space-y-3">
            {highlights.map((item, idx) => (
              <motion.li
                key={idx}
                custom={idx}
                variants={highlightVariants}
                className="flex items-center space-x-3"
                whileHover={{
                  x: 5,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <motion.span
                  className="flex-shrink-0 rounded-full bg-green-100 p-1 text-green-500 dark:bg-green-900"
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.5 },
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </motion.div>
  );
};

export default SingleFeature;
