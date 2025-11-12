"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";
import { useEffect, useState } from "react";

const About = () => {
  const [isInView, setIsInView] = useState(false);

  // Enhanced container variants without fade-in effect
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  // Enhanced item variants with dynamic animations
  const itemVariants = {
    hidden: {
      opacity: 1,
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
      scale: 1.05, // Slightly increased scale for emphasis
      y: -5, // Slight upward movement
      transition: {
        type: "spring",
        bounce: 0.5,
        duration: 0.4,
      },
    },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        onViewportEnter={() => setIsInView(true)}
        className="mx-auto max-w-c-1390 px-4 py-8 md:px-6 md:py-12 lg:py-16 2xl:px-0"
      >
        <motion.div
          className="mb-8 text-center"
          variants={itemVariants}
          whileHover="hover"
        >
          <SectionHeader
            headerInfo={{
              title: `Discover MonkDB`,
              subtitle: `Revolutionizing Data`,
              description: `MonkDB is your AI-native solution for seamless data integration and actionable insights.`,
            }}
          />
        </motion.div>
      </motion.div>
      {/* <!-- ===== About Start ===== --> */}
      <section className="overflow-hidden pb-12 lg:pb-16 xl:pb-20">
        <div className="mx-auto max-w-c-1235 px-4 md:px-6 xl:px-0">
          <div className="flex items-center gap-6 lg:gap-16">
            <motion.div
              variants={{
                hidden: {
                  opacity: 1,
                  x: -20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto hidden md:block md:w-1/2"
            >
              <motion.div
                className="relative h-[400px] w-full"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Image
                  src="/images/about/about-light-01.png"
                  alt="About"
                  className="object-contain dark:hidden"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <Image
                  src="/images/about/about-dark-01.png"
                  alt="About"
                  className="hidden object-contain dark:block"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 1,
                  x: 20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              <span className="font-medium uppercase text-black dark:text-white">
                <span className="mb-2 mr-2 inline-flex rounded-full bg-meta px-4 py-1 text-metatitle uppercase text-white">
                  AI-Native
                </span>{" "}
                Unified Database
              </span>
              <h2 className="relative mb-4 text-3xl font-bold text-black dark:text-white xl:text-hero">
                Built for Modern
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                  Data Solutions
                </span>
              </h2>
              <p className="mb-6">
                MonkDB is designed to unify fragmented data into a single
                platform, enabling smarter decisions and real-time insights for
                modern applications.
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="w-3/4">
                  <h3 className="mb-1 text-metatitle2 text-black dark:text-white">
                    AI-Driven Insights
                  </h3>
                  <p>
                    Built-in capabilities for advanced analytics and machine
                    learning.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* <!-- ===== About Two Start ===== --> */}
      <section>
        <div className="mx-auto max-w-c-1235 overflow-hidden px-4 md:px-6 2xl:px-0">
          <div className="flex items-center gap-6 lg:gap-16">
            <motion.div
              variants={{
                hidden: {
                  opacity: 1,
                  x: -20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2"
            >
              <h4 className="font-medium uppercase text-black dark:text-white">
                Replace Multiple Systems
              </h4>
              <h2 className="relative mb-4 text-3xl font-bold text-black dark:text-white xl:text-hero">
                One Platform to Replace
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg2 dark:before:bg-titlebgdark">
                  Legacy Systems
                </span>
              </h2>
              <p>
                MonkDB unifies vector, time-series, document, geospatial, blob
                storage, and streaming capabilities into a single powerful
                engine, eliminating the need for multiple specialized databases.
              </p>
              <div></div>
            </motion.div>

            {/* Second Movibase Feature Integration */}
            <motion.div
              variants={{
                hidden: {
                  opacity: 1,
                  x: 20,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right relative mx-auto hidden md:block md:w-1/2"
            >
              <motion.div
                className="relative h-[400px] w-full"
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Image
                  src="./images/about/about-light-02.svg"
                  alt="About"
                  className="object-contain dark:hidden"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <Image
                  src="./images/about/about-dark-02.svg"
                  alt="About"
                  className="hidden object-contain dark:block"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
