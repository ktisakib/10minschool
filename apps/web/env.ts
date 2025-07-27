import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
        BETTER_AUTH_SECRET: z.string().min(32, "Auth secret must be at least 32 characters"),
        BASE_URL: z.string().url(),
        PRODUCTION_URL: z.string().url(),

        // Redis Configuration
        UPSTASH_REDIS_REST_URL: z.string().url().optional(),
        UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

        // OAuth Providers - all optional
        AUTH_DISCORD_ID: z.string().min(1).optional(),
        AUTH_DISCORD_SECRET: z.string().min(1).optional(),
        AUTH_GOOGLE_ID: z.string().min(1).optional(),
        AUTH_GOOGLE_SECRET: z.string().min(1).optional(),
        AUTH_GITHUB_ID: z.string().min(1).optional(),
        AUTH_GITHUB_SECRET: z.string().min(1).optional(),
        AUTH_MICROSOFT_ID: z.string().min(1).optional(),
        AUTH_MICROSOFT_SECRET: z.string().min(1).optional(),

        // Alternative OAuth naming (for compatibility)
        GOOGLE_CLIENT_ID: z.string().min(1).optional(),
        GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
        GITHUB_CLIENT_ID: z.string().min(1).optional(),
        GITHUB_CLIENT_SECRET: z.string().min(1).optional(),
        MICROSOFT_CLIENT_ID: z.string().min(1).optional(),
        MICROSOFT_CLIENT_SECRET: z.string().min(1).optional(),
    },
    client: {
        NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
        NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url().optional(),
        NEXT_PUBLIC_ROOT_DOMAIN: z.string().min(1).optional(),
    },
    runtimeEnv: {
        NODE_ENV: process.env.NODE_ENV,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
        BASE_URL: process.env.BASE_URL ?? "http://localhost:3000",
        PRODUCTION_URL: process.env.PRODUCTION_URL ?? "http://localhost:3000",

        // Redis Configuration
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,

        // OAuth Providers
        AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
        AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
        AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
        AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
        AUTH_GITHUB_ID: process.env.AUTH_GITHUB_ID,
        AUTH_GITHUB_SECRET: process.env.AUTH_GITHUB_SECRET,
        AUTH_MICROSOFT_ID: process.env.AUTH_MICROSOFT_ID,
        AUTH_MICROSOFT_SECRET: process.env.AUTH_MICROSOFT_SECRET,

        // Alternative OAuth naming (for compatibility)
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || process.env.AUTH_GOOGLE_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || process.env.AUTH_GOOGLE_SECRET,
        GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID || process.env.AUTH_GITHUB_ID,
        GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET || process.env.AUTH_GITHUB_SECRET,
        MICROSOFT_CLIENT_ID: process.env.MICROSOFT_CLIENT_ID || process.env.AUTH_MICROSOFT_ID,
        MICROSOFT_CLIENT_SECRET: process.env.MICROSOFT_CLIENT_SECRET || process.env.AUTH_MICROSOFT_SECRET,

        // Client variables
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
        NEXT_PUBLIC_BETTER_AUTH_URL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
        NEXT_PUBLIC_ROOT_DOMAIN: process.env.NEXT_PUBLIC_ROOT_DOMAIN,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
