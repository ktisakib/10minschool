import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { and, desc, eq } from "@enterprise/db";
import { CreateTodoSchema, Todo, UpdateTodoSchema } from "@enterprise/db/schema";

import { protectedProcedure } from "../trpc";

export const todoRouter = {
  // Get all todos for the current user
  getAllTodos: protectedProcedure.query(async ({ ctx }: any) => {
    const todos = await ctx.db
      .select()
      .from(Todo)
      .where(eq(Todo.userId, ctx.session.user.id))
      .orderBy(desc(Todo.createdAt));

    return todos;
  }),

  // Get a specific todo by ID (user-scoped)
  getTodoById: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }: any) => {
      const todo = await ctx.db
        .select()
        .from(Todo)
        .where(and(
          eq(Todo.id, input.id),
          eq(Todo.userId, ctx.session.user.id)
        ))
        .limit(1);

      if (!todo[0]) {
        throw new Error("Todo not found");
      }

      return todo[0];
    }),

  // Create a new todo
  createTodo: protectedProcedure
    .input(CreateTodoSchema)
    .mutation(async ({ ctx, input }: any) => {
      const newTodo = await ctx.db
        .insert(Todo)
        .values({
          ...input,
          userId: ctx.session.user.id,
          priority: input.priority as "low" | "medium" | "high" | null | undefined,
        })
        .returning();

      return newTodo[0];
    }),

  // Update a todo
  updateTodo: protectedProcedure
    .input(UpdateTodoSchema)
    .mutation(async ({ ctx, input }: any) => {
      const { id, ...updateData } = input;

      // Runtime check to ensure id is present (TypeScript should guarantee this)
      if (!id) {
        throw new Error("Todo ID is required");
      }

      // Ensure proper typing for priority
      const typedUpdateData = {
        ...updateData,
        priority: updateData.priority as "low" | "medium" | "high" | null | undefined,
      };

      const updatedTodo = await ctx.db
        .update(Todo)
        .set(typedUpdateData)
        .where(and(
          eq(Todo.id, id),
          eq(Todo.userId, ctx.session.user.id)
        ))
        .returning();

      if (!updatedTodo[0]) {
        throw new Error("Todo not found or unauthorized");
      }

      return updatedTodo[0];
    }),

  // Delete a todo
  deleteTodo: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }: any) => {
      const deletedTodo = await ctx.db
        .delete(Todo)
        .where(and(
          eq(Todo.id, input.id),
          eq(Todo.userId, ctx.session.user.id)
        ))
        .returning();

      if (!deletedTodo[0]) {
        throw new Error("Todo not found or unauthorized");
      }

      return { success: true };
    }),

  // Toggle todo completion
  toggleTodo: protectedProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ ctx, input }: any) => {
      const todo = await ctx.db
        .select()
        .from(Todo)
        .where(and(
          eq(Todo.id, input.id),
          eq(Todo.userId, ctx.session.user.id)
        ))
        .limit(1);

      if (!todo[0]) {
        throw new Error("Todo not found");
      }

      const updatedTodo = await ctx.db
        .update(Todo)
        .set({ completed: !todo[0].completed })
        .where(eq(Todo.id, input.id))
        .returning();

      return updatedTodo[0];
    }),
} satisfies TRPCRouterRecord;
