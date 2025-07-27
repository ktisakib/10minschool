import { QueryClient } from "@tanstack/react-query";
import {
    createTRPCReact,
    CreateTRPCReact,
    httpBatchLink,
} from "@trpc/react-query";
import { AppRouter } from "../server/server";

export const trpc: CreateTRPCReact<AppRouter, object> = createTRPCReact<
    AppRouter,
    object
>();

export const queryClient = new QueryClient();

export const createTrpcClient = (url: string, headers?: () => Record<string, string>) => {
    return trpc.createClient({
        links: [
            httpBatchLink({
                url,
                headers: headers ? headers : undefined,
            }),
        ],
    });
};
