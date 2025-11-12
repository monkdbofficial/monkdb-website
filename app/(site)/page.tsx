import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import MonkDBFeature from "@/components/MonkDBFeature";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "MonkDB - AI-Native Unified Database Platform | Vector, Time-Series & Document DB",
  description:
    "MonkDB is a unified, AI-native database platform supporting Vector, Time-Series, Geo-Spatial, Document, Full-Text Search, and Streaming SQL. Transform your data infrastructure with enterprise-grade performance and native AI capabilities.",
  keywords:
    "MonkDB, AI database, unified database, vector database, time-series database, document database, geo-spatial database, full-text search, streaming SQL, Movibase, enterprise database, AI-native platform, multi-modal database",
  path: "/",
  type: "website",
});

export default function Home() {
  return (
    <main>
      <Hero />
      <Brands />
      <About />
      <MonkDBFeature />
      <Feature />
      <FeaturesTab />
      <FunFact />
      <Integration />
      <CTA />
      <FAQ />
      <Contact />
      {/* <Blog /> */}
    </main>
  );
}
