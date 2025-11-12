import React from "react";
import { Brand } from "@/types/brand";
import { motion } from "framer-motion";

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { icon: Icon, name, description, iconColor, bgGradient } = brand;

  const iconVariants = {
    hover: {
      scale: 1.15,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    hover: {
      y: -4,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const glowVariants = {
    hover: {
      boxShadow: [
        "0 0 0px rgba(59, 130, 246, 0)",
        "0 0 20px rgba(59, 130, 246, 0.3)",
        "0 0 0px rgba(59, 130, 246, 0)",
      ],
      transition: {
        duration: 1.5,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      whileHover="hover"
      className="group flex flex-col items-center justify-center px-3 text-center"
    >
      <motion.div
        variants={iconVariants}
        whileHover="hover"
        className={`relative mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-xl md:mb-4 md:h-20 md:w-20 ${bgGradient || "from-blue-50 via-blue-100 to-indigo-100 dark:from-blue-900/30 dark:via-blue-800/30 dark:to-indigo-900/30"}`}
      >
        <motion.div
          variants={glowVariants}
          className="absolute inset-0 rounded-2xl"
        />
        {Icon && (
          <Icon className={`relative z-10 h-7 w-7 transition-all duration-300 group-hover:scale-110 md:h-10 md:w-10 ${iconColor || "text-blue-600 dark:text-blue-400"}`} />
        )}
      </motion.div>
      <div className="space-y-1 md:space-y-1.5">
        <h3 className="text-sm font-bold text-black transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 md:text-base">
          {name}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400 md:text-sm">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default SingleBrand;
