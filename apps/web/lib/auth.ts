import { expo } from "@better-auth/expo";
import { db } from "@enterprise/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import {
    admin,
    anonymous,
    apiKey,
    bearer,
    emailOTP,
    genericOAuth,
    haveIBeenPwned,
    jwt,
    magicLink,
    mcp,
    multiSession,
    oAuthProxy,
    oidcProvider,
    oneTap,
    oneTimeToken,
    openAPI,
    organization,
    phoneNumber,
    twoFactor,
    username,
} from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { sso } from "better-auth/plugins/sso";
import { env } from "../env";
// import { sendEmail } from "./send-email";
// import TwitchResetPasswordEmail from "@/components/emails/reset-password/twitch-reset-password";
// import AWSVerifyEmail from "@/components/emails/magic-links/aws-verify-email";
// import OworthyVerifyEmail from "@/components/emails/oworthy/email-varification";
import * as schema from "@enterprise/db/schema";
import { Redis } from "@upstash/redis";

const redis = env.UPSTASH_REDIS_REST_URL && env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: env.UPSTASH_REDIS_REST_URL,
        token: env.UPSTASH_REDIS_REST_TOKEN,
    })
    : undefined;

export const auth = betterAuth({
    appName: "enterprise-app",
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.NEXT_PUBLIC_BETTER_AUTH_URL || env.BASE_URL,
    advanced: {
        ipAddress: {
            ipAddressHeaders: ["x-client-ip", "x-forwarded-for"],
            disableIpTracking: false,
        },
        useSecureCookies: env.NODE_ENV === "production",
        disableCSRFCheck: false,


        defaultCookieAttributes: env.NEXT_PUBLIC_ROOT_DOMAIN ? {
            domain: `${env.NEXT_PUBLIC_ROOT_DOMAIN}`,
            secure: true,
            httpOnly: true,
            sameSite: "none", // Allows CORS-based cookie sharing across subdomains
            partitioned: true, // New browser standards will mandate this for foreign cookies
        } : {
            secure: env.NODE_ENV === "production",
            httpOnly: true,
            sameSite: "lax",
        },
        trustedOrigins: [
            "http://localhost:8081", // Mobile app development server
            "exp://192.168.1.100:8081", // Expo dev server (adjust IP as needed)
            "http://192.168.1.100:8081", // Local network access
            "enterprise://", // Expo deep link scheme
            "enterprise://*", // Expo deep link scheme with wildcard
        ],
        cookiePrefix: "enterprise-auth",
    },
    database: drizzleAdapter(db, {
        schema,
        provider: "pg", // or "mysql", "sqlite"
        usePlural: true,
    }),
    socialProviders: {
        google: env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET ? {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        } : undefined,
        github: env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET ? {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        } : undefined,
        microsoft: env.MICROSOFT_CLIENT_ID && env.MICROSOFT_CLIENT_SECRET ? {
            clientId: env.MICROSOFT_CLIENT_ID,
            clientSecret: env.MICROSOFT_CLIENT_SECRET,
            // Optional
            tenantId: "common",
            requireSelectAccount: true,
        } : undefined,
    },
    emailVerification: {
        // sendVerificationEmail: async (
        //     { user, url, token }: { user: User; url: string; token: string },
        //     request: any,
        // ) => {
        //     try {
        //         await sendEmail(
        //             OworthyVerifyEmail({
        //                 verificationCode: token,
        //                 email: user.email,
        //                 username: user.name || user.email.split("@")[0],
        //                 url: url,
        //             }),
        //             {
        //                 to: user.email,
        //                 subject: "Verify your email address",
        //                 from: "noreply@oworthy.org",
        //             },
        //         );
        //     } catch (error) {
        //         console.log("Failed to send verification email:", error);
        //         // Optional: Add more error handling logic here
        //     }
        // },
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 3600,
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        // sendResetPassword: async (
        //     { user, url, token }: { user: User; url: string; token: string },
        //     request: any,
        // ) => {
        //     await sendEmail(
        //         TwitchResetPasswordEmail({
        //             username: user.name || user.email,
        //             updatedDate: new Date(),
        //             url: url,
        //         }),
        //         {
        //             to: user.email,
        //             subject: "Reset your password",
        //             from: "support@oworthy.com",
        //         },
        //     );
        // },
    },
    secondaryStorage: redis ? {
        get: async (key: string) => {
            const data = await redis.get(key);
            return data ? String(data) : null;
        },

        set: async (key: string, value: any, ttl?: number) => {
            const serialized = JSON.stringify(value);
            if (ttl) {
                await redis.setex(key, ttl, serialized);
            } else {
                await redis.set(key, serialized);
            }
        },

        delete: async (key: string) => {
            await redis.del(key);
        },
    } : undefined,
    plugins: [
        expo(),
        twoFactor(),
        username(),
        anonymous({
            onLinkAccount: async ({ anonymousUser, newUser }) => {
                // perform actions like moving the cart items from anonymous user to the new user
            },
        }),
        phoneNumber({
            sendOTP: ({ phoneNumber, code }, request) => {
                // Implement sending OTP code via SMS
            },
        }),
        magicLink({
            sendMagicLink: async ({ email, token, url }, request) => {
                // send email to user
            },
        }),
        emailOTP({
            async sendVerificationOTP(
                {
                    email,
                    otp,
                    type,
                }: {
                    email: string;
                    otp: string;
                    type: "sign-in" | "email-verification" | "forget-password";
                },
                request: any,
            ) {
                // await sendEmail(
                //     AWSVerifyEmail({
                //         verificationCode: otp,
                //         email: email,
                //         username: email.split("@")[0],
                //     }),
                //     {
                //         to: email,
                //         subject: "Your verification code",
                //         from: "noreply@oworthy.com",
                //     },
                // );
            },
        }),
        passkey(),
        genericOAuth({
            config: [
                {
                    providerId: "provider-id",
                    clientId: "test-client-id",
                    clientSecret: "test-client-secret",
                    discoveryUrl:
                        "https://auth.example.com/.well-known/openid-configuration",
                    // ... other config options
                },
                // Add more providers as needed
            ],
        }),
        oneTap(),
        admin(),
        apiKey({
            enableMetadata: true,
        }),
        mcp({
            loginPage: "/signin", // path to your login page
        }),

        organization({
            teams: {
                enabled: true,
                maximumTeams: 1, // Optional: limit teams per organization
                allowRemovingAllTeams: false, // Optional: prevent removing the last team
            },
        }),
        oidcProvider({
            // Login and consent page configuration
            loginPage: "/signin", // Path to the login page
            consentPage: "/concent", // Path to the custom consent page

            // Enable dynamic client registration
            allowDynamicClientRegistration: true,

            // OIDC Metadata customization
            metadata: {
                issuer: "https://careplus.com", // Issuer URL
                authorization_endpoint: "/custom/oauth2/authorize",
                token_endpoint: "/custom/oauth2/token",
                userinfo_endpoint: "/custom/oauth2/userinfo", // Custom user info endpoint
                jwks_uri: "/custom/oauth2/jwks", // Custom JWKS endpoint (Note: Not fully implemented)
            },
            allowPlainCodeChallengeMethod: false, // Allow plain code challenge method

            // getAdditionalUserInfoClaim: (user: User, scopes: string[]) => {
            //     const additionalClaims: Record<string, any> = {};
            //     if (scopes.includes('profile')) {
            //       additionalClaims['name'] = user.name;
            //       // Use only properties that exist on the User type
            //       // If these fields don't exist, you may need to extend the User type
            //       additionalClaims['picture'] = user.image;
            //       // For given_name and family_name, split the name if available
            //       if (user.name) {
            //         const nameParts = user.name.split(' ');
            //         additionalClaims['given_name'] = nameParts[0];
            //         additionalClaims['family_name'] = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
            //       }
            //     }
            //     if (scopes.includes('email')) {
            //       additionalClaims['email'] = user.email;
            //       additionalClaims['email_verified'] = user.emailVerified;
            //     }
            //     return additionalClaims;
            //   },
        }),
        sso(),
        bearer(),
        // captcha({
        //   provider: "cloudflare-turnstile", // or google-recaptcha, hcaptcha
        //   secretKey: env.TURNSTILE_SECRET_KEY!,
        // }),
        haveIBeenPwned({
            customPasswordCompromisedMessage: "Please choose a more secure password.",
        }),
        multiSession({
            maximumSessions: 3,
        }),
        oneTimeToken(),
        oAuthProxy(),
        openAPI({
            path: "/docs",
        }),
        jwt(),

        magicLink({
            sendMagicLink: async ({ email, token, url }, request) => {
                // send email to user
            },
        }),

        nextCookies(),
    ],
}) as any;
