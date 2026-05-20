import type { NextConfig } from "next";

// The ViewMonk Workbench page itself is rendered by a real Next.js page at
// app/[locale]/downloads so the site Navbar and Footer wrap it. Release
// archives (LITE/FULL zips and tarballs) still live on Cloudflare R2 — we
// proxy them through /releases on monkdb.com so the r2.dev hostname never
// appears in download hover previews or browser history.
const R2_DOWNLOADS = 'https://pub-cc3901daba764b61bc2141554b3d1652.r2.dev';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/releases/:path*',
        destination: `${R2_DOWNLOADS}/releases/:path*`,
      },
    ];
  },
};

export default nextConfig;
