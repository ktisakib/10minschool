import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();
const publicProcedure = t.procedure;

const appRouter = t.router({
  todo: t.router({
    getTodoById: publicProcedure.input(z.object({ id: z.string() })).output(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      createdAt: z.string(),
      dueDate: z.string().optional(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
    })).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    getAllTodos: publicProcedure.output(z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      createdAt: z.string(),
      dueDate: z.string().optional(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
    }))).query(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    createTodo: publicProcedure.input(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      createdAt: z.string(),
      dueDate: z.string().optional(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
    }).omit({
      id: true,
      createdAt: true,
    })).output(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      createdAt: z.string(),
      dueDate: z.string().optional(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    updateTodo: publicProcedure.input(z.object({
      id: z.string(),
      data: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        completed: z.boolean(),
        createdAt: z.string(),
        dueDate: z.string().optional(),
        priority: z.enum(['low', 'medium', 'high']).optional(),
      }).omit({
        id: true,
        createdAt: true,
      }).partial(),
    })).output(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      completed: z.boolean(),
      createdAt: z.string(),
      dueDate: z.string().optional(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
    })).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any),
    deleteTodo: publicProcedure.input(z.object({
      id: z.string(),
    })).output(z.boolean()).mutation(async () => "PLACEHOLDER_DO_NOT_REMOVE" as any)
  })
});

export { appRouter };
export type AppRouter = typeof appRouter;
