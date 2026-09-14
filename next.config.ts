import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Laravel local storage (development)
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        // Laravel production storage (update hostname sesuai domain live)
        protocol: "https",
        hostname: "armedia.id",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
