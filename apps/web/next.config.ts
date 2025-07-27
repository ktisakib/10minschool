import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';


const nextConfig: NextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
            hmrRefreshes: true,
        },
    },
    allowedDevOrigins: ["localhost:3000", "localhost:8081"],
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

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
