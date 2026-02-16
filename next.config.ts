import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "milkekhareedo-storage.s3.ap-southeast-2.amazonaws.com",
        pathname: "/**",
      },
      // Allow any S3 bucket domain (common patterns)
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        pathname: "/**",
      },
    ],
    // Allow unoptimized images for external domains not in remotePatterns
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        "source": "/admin",
        "destination": "https://milke-khareedo-admin-dashboard.vercel.app"
      },
      {
        source: "/admin/:path*",
        destination:
          "https://milke-khareedo-admin-dashboard.vercel.app/admin/:path*",
      },
    ];
  },
};

export default nextConfig;
