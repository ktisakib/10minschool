"use client";

import TrpcProvider from "@enterprise/trpc/trpc-provider";
import { ReactNode } from "react";
import { authClient } from "./auth";

interface MobileTrpcProviderProps {
    children: ReactNode;
    url: string;
}

export function MobileTrpcProvider({ children, url }: MobileTrpcProviderProps) {
    // Function to get auth headers for tRPC requests
    const getAuthHeaders = () => {
        const headers: Record<string, string> = {};

        // Get the auth cookie from Better Auth
        const cookies = authClient.getCookie();
        if (cookies) {
            headers["Cookie"] = cookies;
        }

        return headers;
    };

    return (
        <TrpcProvider url={url} getAuthHeaders={getAuthHeaders}>
            {children}
        </TrpcProvider>
    );
}
