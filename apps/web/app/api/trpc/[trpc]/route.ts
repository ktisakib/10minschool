import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { auth } from "@/lib/auth";
import { appRouter } from "@enterprise/trpc/router";
import { createTRPCContext } from "@enterprise/trpc/trpc";

const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: () =>
            createTRPCContext({
                headers: req.headers,
                auth,
            }),
    });

export { handler as GET, handler as POST };
