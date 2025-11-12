"use client";
import { motion } from "framer-motion";

const valuesData = [
  {
    id: 1,
    icon: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.5 19.5V18H3.5V19.5H9.5ZM9.5 14.25V12.75H3.5V14.25H9.5ZM20.5 19.5V18H14.5V19.5H20.5ZM20.5 14.25V12.75H14.5V14.25H20.5ZM20.5 9V7.5H3.5V9H20.5Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Innovation First",
    description:
      "We build from first principles, pushing boundaries while staying grounded in real customer needs.",
    gradient: "from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800",
  },
  {
    id: 2,
    icon: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Customer Obsessed",
    description:
      "Every feature, every decision starts with understanding our customers' deepest challenges.",
    gradient:
      "from-green-100 to-green-50 dark:from-green-900 dark:to-green-800",
  },
  {
    id: 3,
    icon: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.14 12.94C19.18 12.64 19.2 12.33 19.2 12C19.2 11.67 19.18 11.36 19.13 11.06L21.16 9.48C21.34 9.34 21.39 9.07 21.28 8.87L19.36 5.55C19.24 5.33 18.99 5.26 18.77 5.33L16.38 6.29C15.88 5.91 15.35 5.59 14.76 5.35L14.4 2.81C14.36 2.57 14.16 2.4 13.92 2.4H10.08C9.84 2.4 9.65 2.57 9.61 2.81L9.25 5.35C8.66 5.59 8.12 5.92 7.63 6.29L5.24 5.33C5.02 5.25 4.77 5.33 4.65 5.55L2.74 8.87C2.62 9.08 2.66 9.34 2.86 9.48L4.89 11.06C4.84 11.36 4.8 11.68 4.8 12C4.8 12.32 4.82 12.64 4.87 12.94L2.84 14.52C2.66 14.66 2.61 14.93 2.72 15.13L4.64 18.45C4.76 18.67 5.01 18.74 5.23 18.67L7.62 17.71C8.12 18.09 8.65 18.41 9.24 18.65L9.6 21.19C9.65 21.43 9.84 21.6 10.08 21.6H13.92C14.16 21.6 14.36 21.43 14.39 21.19L14.75 18.65C15.34 18.41 15.88 18.09 16.37 17.71L18.76 18.67C18.98 18.75 19.23 18.67 19.35 18.45L21.27 15.13C21.39 14.91 21.34 14.66 21.15 14.52L19.14 12.94ZM12 15.6C10.02 15.6 8.4 13.98 8.4 12C8.4 10.02 10.02 8.4 12 8.4C13.98 8.4 15.6 10.02 15.6 12C15.6 13.98 13.98 15.6 12 15.6Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Engineering Excellence",
    description:
      "We believe in building robust, scalable solutions that stand the test of production environments.",
    gradient:
      "from-purple-100 to-purple-50 dark:from-purple-900 dark:to-purple-800",
  },
  {
    id: 4,
    icon: (
      <svg
        className="h-8 w-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "Radical Transparency",
    description:
      "Open communication, clear documentation, and honest partnerships define our approach.",
    gradient:
      "from-orange-100 to-orange-50 dark:from-orange-900 dark:to-orange-800",
  },
];

const Values = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -10 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { type: "spring", stiffness: 400 },
    },
  };

  return (
    <section className="mb-8 mt-8 pt-5 md:mb-10 md:mt-10 md:pt-7 lg:pt-10">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div variants={itemVariants}>
            <span className="mb-4.5 inline-flex items-center rounded-full bg-meta px-4.5 py-1.5 text-metatitle uppercase text-white">
              Our Values
            </span>
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white xl:text-sectiontitle2">
              Guiding Principles
            </h2>
            <p className="max-w-c-850 mx-auto mb-15 text-lg text-gray-600 dark:text-gray-300">
              These core principles guide everything we do - from product
              development to customer relationships.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {valuesData.map((value) => (
              <motion.div
                key={value.id}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 150, damping: 20 },
                }}
                className="shadow-feature rounded-xl border border-gray-100 bg-white p-8 dark:border-gray-700 dark:bg-gray-800"
              >
                <motion.div
                  variants={iconVariants}
                  whileHover="hover"
                  className={`relative mb-6 flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-tr ${value.gradient}`}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0"
                    whileHover={{
                      opacity: 0.5,
                      scale: 1.2,
                      transition: { duration: 0.3 },
                    }}
                  />
                  <div className="relative z-10 text-black dark:text-white">
                    {value.icon}
                  </div>
                </motion.div>
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Values;
