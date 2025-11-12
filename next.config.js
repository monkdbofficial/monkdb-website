/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable image optimization
  images: {
    domains: ["i.ytimg.com", "drive.google.com", "lh3.googleusercontent.com"], // YouTube and Google Drive thumbnails
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },

  // Optimize JavaScript and CSS
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Optimize third-party scripts
  experimental: {
    optimizePackageImports: ["react-icons", "date-fns", "lodash"],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // if using TS but want to ignore type errors
  },
  webpack: (config, { isServer }) => {
    // Disable canvas for PDF.js
    config.resolve.alias.canvas = false;

    // Fix for PDF.js in Next.js
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        canvas: false,
      };
    }

    // Handle PDF.js worker files
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },
};

module.exports = nextConfig;
