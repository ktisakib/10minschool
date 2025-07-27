import { authRouter } from "./routers/auth";
import { todoRouter } from "./routers/todo";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
// @ts-ignore - Complex type inference issue with zod references
export const appRouter = createTRPCRouter({
  auth: authRouter,
  todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
