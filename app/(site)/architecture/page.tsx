import HowItWorks from "@/components/About/HowItWorks";
import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "MonkDB Architecture - Control Plane & Data Plane Design",
  description:
    "Explore MonkDB's innovative architecture featuring separated control and data planes, multi-modal data engines, and AI-native capabilities. Learn how our unified platform delivers enterprise-grade performance with complete data sovereignty.",
  keywords:
    "MonkDB architecture, control plane, data plane, database architecture, multi-modal engine, AI-native database, distributed database, cloud-agnostic database, enterprise architecture",
  path: "/architecture",
  type: "website",
});

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
