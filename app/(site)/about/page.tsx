import AboutHero from "@/components/About/AboutHero";
import KeyFeaturesSection from "@/components/About/KeyFeaturesSection";
import Founders from "@/components/About/KeyFeaturesSection";
import Values from "@/components/About/Values";
import HowItWorks from "@/components/About/HowItWorks";
import WhyChooseMonkDB from "@/components/About/WhyChooseMonkDB";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "About MonkDB - Transforming Enterprise Data Infrastructure",
  description:
    "Discover MonkDB's mission to revolutionize data management. Learn about our AI-native unified database platform, core values, and commitment to simplifying data complexity for businesses worldwide.",
  keywords:
    "About MonkDB, MonkDB mission, AI-native database, unified database platform, enterprise data infrastructure, database innovation, Movibase, data management solutions",
  path: "/about",
  type: "website",
});

const AboutPage = () => {
  return (
    <>
      <div className="mt-8 md:mt-12 lg:mt-16">
        <AboutHero />
        <Values />
      </div>
    </>
  );
};

export default AboutPage;
