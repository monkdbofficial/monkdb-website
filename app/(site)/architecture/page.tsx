import AboutHero from "@/components/About/AboutHero";
import KeyFeaturesSection from "@/components/About/KeyFeaturesSection";
import Founders from "@/components/About/KeyFeaturesSection";
import Values from "@/components/About/Values";
import HowItWorks from "@/components/About/HowItWorks";
import WhyChooseMonkDB from "@/components/About/WhyChooseMonkDB";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About MonkDB | AI-Native Database Platform",
  description:
    "Learn about MonkDB's mission to transform enterprise data infrastructure with MonkDB - the unified, AI-native database platform.",
};

const AboutPage = () => {
  return (
    <>
      <div className="mt-8 md:mt-12 lg:mt-16">
        <HowItWorks />
      </div>
    </>
  );
};

export default AboutPage;
