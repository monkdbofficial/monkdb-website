import type { NextConfig } from "next";

// The downloads page is a single static HTML file served from Cloudflare R2.
// We proxy it through `/downloads` on monkdb.com so users never see the r2.dev
// hostname in their URL bar, hover preview, or browser history.
const R2_DOWNLOADS = 'https://pub-cc3901daba764b61bc2141554b3d1652.r2.dev';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/downloads',
        destination: `${R2_DOWNLOADS}/downloads/index.html`,
      },
      // Release archives (LITE/FULL zips and tarballs) referenced by the page.
      // Rewriting them too lets the page link to relative `/releases/...` URLs
      // so the r2.dev hostname never appears in hover previews or downloads.
      {
        source: '/releases/:path*',
        destination: `${R2_DOWNLOADS}/releases/:path*`,
      },
    ];
  },
};

export default nextConfig;
