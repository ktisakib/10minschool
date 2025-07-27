import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
  getSession: publicProcedure.query(({ ctx }: any) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
  signOut: protectedProcedure.mutation(async ({ ctx }: any) => {
    await ctx.authApi.signOut({
      headers: new Headers(),
    });
    return { success: true };
  }),
} satisfies TRPCRouterRecord;
