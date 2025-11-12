import { Metadata } from "next";

const baseUrl = "https://monkdb.com";
const companyName = "MonkDB";
const twitterHandle = "@Movibase";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  noindex?: boolean;
}

export function generateSEO({
  title,
  description,
  keywords = "",
  path = "",
  image = "/images/og-image.png",
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  noindex = false,
}: SEOProps): Metadata {
  const url = `${baseUrl}${path}`;
  const fullTitle = title.includes(companyName) ? title : `${title} | ${companyName}`;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords,
    authors: authors?.map((name) => ({ name })) || [{ name: "MonkDB Team" }],
    creator: "Movibase",
    publisher: "Movibase",
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: "en_US",
      url,
      title: fullTitle,
      description,
      siteName: companyName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && publishedTime && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
        authors: authors || ["MonkDB Team"],
        section,
      }),
    },
    twitter: {
      card: "summary_large_image",
      site: twitterHandle,
      creator: twitterHandle,
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };

  return metadata;
}

// Structured Data Schemas
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MonkDB",
    legalName: "Movibase Platform Private Limited",
    url: baseUrl,
    logo: `${baseUrl}/images/logo/logo.svg`,
    foundingDate: "2020",
    founders: [
      {
        "@type": "Person",
        name: "Movibase Team",
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Wework Raheja Mindspace, Building 9, Floor 13",
      addressLocality: "Madhapur, Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500081",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-XXX-XXX-XXXX",
      contactType: "Customer Service",
      email: "support@monkdb.com",
      availableLanguage: ["en"],
    },
    sameAs: [
      "https://twitter.com/Movibase",
      "https://www.linkedin.com/company/movibase",
      "https://github.com/movibase",
    ],
  };
}

export function generateSoftwareProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MonkDB",
    applicationCategory: "DatabaseApplication",
    applicationSubCategory: "AI-Native Database",
    operatingSystem: "All",
    description:
      "MonkDB is an AI-Native Unified Database that supports Vector, Time-Series, Geo-Spatial, Blob Store, Document, Full-Text Search, and Streaming SQL capabilities.",
    softwareVersion: "2.0",
    releaseNotes: "Enhanced AI-native capabilities and performance improvements",
    screenshot: `${baseUrl}/images/screenshots/dashboard.png`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      priceValidUntil: "2025-12-31",
    },
    provider: {
      "@type": "Organization",
      name: "Movibase",
      url: "https://movibase.com",
    },
    featureList: [
      "Vector Database",
      "Time-Series Database",
      "Document Database",
      "Geo-Spatial Database",
      "Full-Text Search",
      "Streaming SQL",
      "AI-Native Capabilities",
      "Multi-Modal Data Engine",
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author = "MonkDB Team",
  url,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image.startsWith("http") ? image : `${baseUrl}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "MonkDB",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}${url}`,
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateVideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    contentUrl,
    embedUrl: contentUrl,
  };
}
