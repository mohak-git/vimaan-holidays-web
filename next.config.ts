import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,
    images: {
        remotePatterns: [{ hostname: "images.unsplash.com", protocol: "https", pathname: "/**" }],
    },
};

export default nextConfig;
