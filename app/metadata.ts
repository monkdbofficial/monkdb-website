export const siteMetadata = {
  title: "MonkDB - The AI-Native Unified Database by Movibase",
  description:
    "MonkDB is a unified database supporting Vector, Time-Series, Geo-Spatial, Blob Store, Document, Full-Text Search, and Streaming SQL with native AI capabilities.",
  keywords:
    "MonkDB, Movibase, AI-Native Database, Unified Database, Vector Database, Time-Series Database, Geo-Spatial Database, Document Database, Full-Text Search, Streaming SQL",
  authors: [{ name: "Movibase Team" }],
  creator: "Movibase",
  publisher: "Movibase",
  metadataBase: new URL("https://monkdb.com"), // Replace with your actual domain
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://monkdb.com",
    title: "MonkDB - The AI-Native Unified Database",
    description:
      "Transform your data management with MonkDB - the unified database solution with native AI capabilities.",
    siteName: "MonkDB",
    images: [
      {
        url: "/images/og-image.png", // Add your OG image
        width: 1200,
        height: 630,
        alt: "MonkDB - AI-Native Unified Database",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MonkDB - The AI-Native Unified Database",
    description:
      "Transform your data management with MonkDB - the unified database solution with native AI capabilities.",
    images: ["/images/twitter-image.png"], // Add your Twitter card image
    creator: "@Movibase",
  },
};
