import { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const metadata: Metadata = generateSEO({
  title: "MonkDB Blog - Insights, Guides & Resources",
  description:
    "Explore MONKDB insights, technical documentation, video tutorials, and industry resources. Stay updated with the latest database innovations, AI-native features, and best practices.",
  keywords:
    "MonkDB blog, database blog, AI database tutorials, vector database guides, time-series database, technical documentation, database resources, MonkDB updates",
  path: "/blog",
  type: "website",
});

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
