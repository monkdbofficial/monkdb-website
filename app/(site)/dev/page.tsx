"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Mail } from "lucide-react";

const CompanyCredits = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-gradient-to-b from-transparent to-gray-50 py-28 dark:to-gray-900 lg:py-36">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-center"
        >
          <div className="w-full px-4">
            <div className="mx-auto max-w-[900px] text-center">
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mb-6 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl md:text-[50px]"
              >
                Crafted with Excellence by
              </motion.h2>

              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-5 text-2xl font-bold text-black text-primary dark:text-white md:text-3xl"
              >
                Suryakant Kumar
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mx-auto mb-12 max-w-2xl text-lg font-medium leading-relaxed text-gray-700 dark:text-gray-300"
              >
                Passionate developer crafting exceptional digital experiences
                through innovative design and cutting-edge technology.
                Transforming complex ideas into elegant solutions.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-4"
              >
                <Link
                  href="mailto:suryakantkumar.dev@gmail.com"
                  className="flex items-center justify-center rounded-full bg-primary px-6 py-3 text-white transition-all hover:bg-opacity-90 hover:shadow-lg"
                >
                  <Mail size={20} className="mr-2" />
                  <span className="font-medium">
                    suryakantkumar.dev@gmail.com
                  </span>
                </Link>
                <Link
                  href="https://suryakantkumardev.github.io/"
                  target="_blank"
                  className="flex items-center justify-center rounded-full border border-primary bg-white px-6 py-3 text-primary transition-all hover:shadow-lg dark:bg-gray-800"
                >
                  <Globe size={20} className="mr-2" />
                  <span className="font-medium">Visit My Website</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-20"
              >
                <h4 className="mb-8 text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Built with Premium Technologies
                </h4>
                <div className="flex flex-wrap justify-center gap-6">
                  {technologies.map((tech, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex w-24 flex-col items-center rounded-xl bg-white p-5 shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800"
                    >
                      <div className="flex h-10 w-10 items-center justify-center">
                        {tech.icon}
                      </div>
                      <p className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {tech.name}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-400 to-primary"></div>
    </section>
  );
};

const technologies = [
  {
    name: "Next.js",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        fill="none"
      >
        <path d="M12 2L2 19.8h20L12 2z" />
      </svg>
    ),
  },
  {
    name: "React",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        fill="none"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15 15 0 0 0 0 20 15 15 0 0 0 0-20" />
        <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        fill="none"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M14 16v-4h6v4" />
        <path d="M19 12v8" />
        <path d="M3 12h10" />
      </svg>
    ),
  },
  {
    name: "Tailwind",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        fill="none"
      >
        <path d="M12 6C8 6 6 8 6 12s4 6 2 10c0 0 4-2 6-2s6 2 6 2c-2-4 2-6 2-10s-2-6-6-6z" />
      </svg>
    ),
  },
  {
    name: "Framer",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        stroke="currentColor"
        fill="none"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <rect x="6" y="9" width="12" height="6" />
      </svg>
    ),
  },
];

export default CompanyCredits;
