"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { createTrpcClient, queryClient, trpc } from "../client";

interface TrpcProviderProps {
    url: string;
    children?: ReactNode;
    getAuthHeaders?: () => Record<string, string>;
}

export default function TrpcProvider({ children, url, getAuthHeaders }: TrpcProviderProps) {
    const client = createTrpcClient(url, getAuthHeaders);

    return (
        <trpc.Provider client={client} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </trpc.Provider>
    );
}
