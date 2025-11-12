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

export const metadata: Metadata = {
  title: "MONK DB",

  // other metadata
  description: "This is Home for Database",
};

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
