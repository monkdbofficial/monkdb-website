"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const metrics = [
  {
    title: "Query Performance",
    value: "1.5M+",
    unit: "QPS",
    description: "Query matches per second with ANN search & HNSW indexing",
    icon: "/images/icon/speed.svg",
  },
  {
    title: "Response Time",
    value: "<50",
    unit: "ms",
    description: "Average latency for mixed workloads under high concurrency",
    icon: "/images/icon/timer.svg",
  },
  {
    title: "Data Types",
    value: "7+",
    unit: "modalities",
    description:
      "Vector, time-series, document, geo-spatial, and more in one engine",
    icon: "/images/icon/database.svg",
  },
  {
    title: "Scaling",
    value: "Linear",
    unit: "horizontal",
    description: "Near-linear scaling across cloud and hybrid environments",
    icon: "/images/icon/scale.svg",
  },
];

const PerformanceMetrics = () => {
  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="animate_top rounded-lg bg-white p-8 shadow-solid-3 dark:bg-blacksection"
            >
              <div className="relative mb-8 flex h-16 w-16 items-center justify-center rounded-[4px] bg-primary/10 dark:bg-primary/5">
                <Image
                  src={metric.icon}
                  width={32}
                  height={32}
                  alt={metric.title}
                  className="dark:invert"
                />
              </div>

              <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
                {metric.title}
              </h4>

              <div className="mb-4 flex items-end gap-1">
                <span className="text-3xl font-bold text-black dark:text-white">
                  {metric.value}
                </span>
                <span className="text-sm text-black dark:text-white">
                  {metric.unit}
                </span>
              </div>

              <p className="text-body-color dark:text-body-color-dark text-sm">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h2 className="mb-10 text-3xl font-bold text-black dark:text-white">
            Built for Enterprise Scale
          </h2>

          <div className="relative mx-auto aspect-[16/9] max-w-c-1154">
            <Image
              fill
              src="/images/benchmarks/performance-graph-light.svg"
              alt="Performance Graph"
              className="dark:hidden"
            />
            <Image
              fill
              src="/images/benchmarks/performance-graph-dark.svg"
              alt="Performance Graph"
              className="hidden dark:block"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceMetrics;
