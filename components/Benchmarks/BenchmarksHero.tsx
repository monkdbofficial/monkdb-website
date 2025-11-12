"use client";
import { motion } from "framer-motion";

const BenchmarksHero = () => {
  return (
    <section className="pb-20 pt-35 lg:pb-25 xl:pb-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <div className="flex flex-col gap-8 md:gap-10">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="animate_top text-center"
          >
            <h1 className="mb-5 text-3xl font-bold text-black dark:text-white xl:text-hero">
              Enterprise-Grade{" "}
              <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark">
                Performance
              </span>
            </h1>
            <p className="max-w-c-850 mx-auto text-lg">
              MonkDB delivers benchmark-setting performance across multiple data
              modalities while maintaining the simplicity of a unified query
              layer. See how our platform performs across different workloads
              and use cases.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BenchmarksHero;
