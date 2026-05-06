import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
		remotePatterns: [{ protocol: "https", hostname: "ftp.goit.study" }], // повернено, щоби працював маршрут подорожі (поки що)
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
