import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
            hmrRefreshes: true,
        },
    },
    allowedDevOrigins: ["localhost:3000", "localhost:8081", "auth.localhost"],
    transpilePackages: ["@enterprise/ui", "@enterprise/db", "@enterprise/trpc"],

    async headers() {
        return [
            {
                source: "/api/auth/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "*", // Set your origin
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "Content-Type, Authorization",
                    },
                ],
            },
        ];
    },
}

export default nextConfig
