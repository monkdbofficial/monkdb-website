/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable image optimization
  images: {
    domains: ["your-image-domain.com"], // Add your image domains
    formats: ["image/avif", "image/webp"],
  },

  // Minify JavaScript
  swcMinify: true,

  // Optimize JavaScript and CSS
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Optimize third-party scripts
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["react-icons", "date-fns", "lodash"],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true, // if using TS but want to ignore type errors
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
