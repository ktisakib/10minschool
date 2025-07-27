import { sql } from "drizzle-orm";
import { pgTable } from "drizzle-orm/pg-core";
import { z } from "zod";

// Todo schema with user association
export const Todo = pgTable("todo", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  name: t.varchar({ length: 256 }).notNull(),
  description: t.text().notNull(),
  completed: t.boolean().notNull().default(false),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
  dueDate: t.timestamp(),
  priority: t.varchar({ length: 10 }).$type<"low" | "medium" | "high">(),
  userId: t
    .text()
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
}));

// Create schemas manually to ensure proper type handling
export const CreateTodoSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  completed: z.boolean().default(false),
  dueDate: z.date().nullable().optional(),
  priority: z.enum(["low", "medium", "high"]).nullable().optional(),
});

export const UpdateTodoSchema = z.object({
  id: z.string().uuid(),
}).merge(CreateTodoSchema.partial());

// Re-export auth schemas
export * from "./auth-schema";

// Import user from auth schema for the reference
import { users } from "./auth-schema";
