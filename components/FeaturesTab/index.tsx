"use client";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

// Import tab content components from the correct paths
import RoIWithMonkDB from "@/components/RoIWithMonkDB";
import CompetitionMatrix from "@/components/CompetitionMatrix";
import MonkDBComparisonTable from "@/components/MonkDBComparisonTable";

const FeaturesTab = () => {
  const [currentTab, setCurrentTab] = useState("tabOne");

  // Tab data to make it more maintainable
  const tabsData = [
    {
      id: "tabOne",
      icon: "📊",
      title: "Competition Matrix",
      component: <CompetitionMatrix />,
    },
    {
      id: "tabTwo",
      icon: "🔄",
      title: "Comparison Table",
      component: <MonkDBComparisonTable />,
    },
    {
      id: "tabThree",
      icon: "💰",
      title: "ROI Analysis",
      component: <RoIWithMonkDB />,
    },
  ];

  return (
    <>
      <section className="relative pb-12 pt-10 md:pb-20 md:pt-18.5 lg:pb-22.5">
        <div className="relative mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* Background Image - Adjusted for mobile */}
          <div className="absolute -top-8 -z-1 mx-auto h-[250px] w-full md:-top-16 md:h-[350px] md:w-[90%]">
            <Image
              fill
              className="dark:hidden"
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted Shape"
            />
            <Image
              fill
              className="hidden dark:block"
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted Shape"
            />
          </div>

          {/* Tab Menu - Enhanced mobile layout */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top mb-8 flex flex-col justify-center rounded-lg border border-y-[#D9E5F2] bg-gradient-to-b from-[#FFFFFF] via-[#F6F9FC] to-[#F6F9FC] shadow-solid-5 dark:border-y-[#041521] dark:bg-gradient-to-b dark:from-[#041521] dark:to-[#02080D] md:mb-15 md:flex-row md:items-center lg:gap-7.5 xl:mb-21.5 xl:gap-12.5"
          >
            {tabsData.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`relative flex items-center gap-3 border-b border-stroke px-4 py-3 last:border-0 dark:border-strokedark md:border-0 md:px-6 md:py-2 xl:px-13.5 xl:py-5 ${
                  currentTab === tab.id
                    ? "active bg-blue-50/50 before:absolute before:bottom-0 before:left-0 before:h-full before:w-1 before:bg-primary dark:bg-blue-900/10 md:before:h-1 md:before:w-full"
                    : ""
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-blacksection md:h-12.5 md:w-12.5">
                  <p className="text-xl md:text-2xl">{tab.icon}</p>
                </div>
                <div className="flex-1 md:w-3/5 lg:w-auto">
                  <button className="text-left text-sm font-medium text-black dark:text-white xl:text-regular">
                    {tab.title}
                  </button>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Tab Content - Improved mobile spacing */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="animate_top mx-auto px-4 md:px-0"
          >
            {tabsData.map((tab) => (
              <div
                key={tab.id}
                className={`${currentTab === tab.id ? "block" : "hidden"} transition-all duration-300`}
              >
                {tab.component}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FeaturesTab;
