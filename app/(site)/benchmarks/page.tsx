import BenchmarksHero from "@/components/Benchmarks/BenchmarksHero";
import PerformanceMetrics from "@/components/Benchmarks/PerformanceMetrics";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MonkDB Performance Benchmarks",
  description:
    "See how MonkDB delivers industry-leading performance across vector search, time-series analytics, and multi-modal workloads.",
};

export default function BenchmarksPage() {
  return (
    <>
      <BenchmarksHero />
      <PerformanceMetrics />
    </>
  );
}
