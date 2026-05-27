import {
    adminClient,
    anonymousClient,
    apiKeyClient,
    emailOTPClient,
    genericOAuthClient,
    jwtClient,
    magicLinkClient,
    multiSessionClient,
    oidcClient,
    oneTapClient,
    oneTimeTokenClient,
    organizationClient,
    passkeyClient,
    phoneNumberClient,
    ssoClient,
    twoFactorClient,
    usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";



export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
    plugins: [
        twoFactorClient() as any,
        usernameClient(),
        anonymousClient(),
        phoneNumberClient(),
        magicLinkClient(),
        emailOTPClient(),
        passkeyClient(),
        genericOAuthClient(),
        oneTapClient({
            clientId: "YOUR_CLIENT_ID",
            // Optional client configuration:
            autoSelect: false,
            cancelOnTapOutside: true,
            context: "signin",
            additionalOptions: {
                // Any extra options for the Google initialize method
            },
            // Configure prompt behavior and exponential backoff:
            promptOptions: {
                baseDelay: 1000, // Base delay in ms (default: 1000)
                maxAttempts: 5, // Maximum number of attempts before triggering onPromptNotification (default: 5)
            },
        }),
        adminClient(),
        apiKeyClient(),
        organizationClient(),
        oidcClient(),
        ssoClient(),
        oneTimeTokenClient(),
        jwtClient(),
        multiSessionClient(),
    ],
}) as any;


export const { signIn, signUp, useSession } = authClient
