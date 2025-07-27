// Export Expo-specific auth client functions
import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    // Use your computer's local IP address instead of localhost for mobile access
    // You can find your IP by running `ipconfig getifaddr en0` on macOS or `hostname -I` on Linux
    baseURL: "http://localhost:3000", // For web development
    // baseURL: "http://192.168.1.100:3000", // Use this for mobile device testing (replace with your actual IP)
    fetchOptions: {
        credentials: 'include', // This ensures cookies are sent with requests
    },
    plugins: [
        expoClient({
            scheme: "enterprise", // Match your app.json scheme
            storagePrefix: "enterprise-app",
            storage: SecureStore,
        })
    ]
}) as any;
