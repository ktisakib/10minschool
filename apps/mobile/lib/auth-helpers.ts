// Example of how to use Better Auth with Expo and tRPC
// This file demonstrates the complete integration setup

import { trpc } from "@enterprise/trpc/client";
import { authClient } from "./auth";

// Example: Sign in with email and password
export const signInWithEmail = async (email: string, password: string) => {
    try {
        const result = await authClient.signIn.email({
            email,
            password,
        });

        if (result.error) {
            throw new Error(result.error.message);
        }

        return result;
    } catch (error) {
        console.error("Sign in failed:", error);
        throw error;
    }
};

// Example: Sign in with social provider
export const signInWithSocial = async (provider: "google" | "github" | "microsoft") => {
    try {
        const result = await authClient.signIn.social({
            provider,
            callbackURL: "/", // Will be converted to "enterprise://" deep link
        });

        return result;
    } catch (error) {
        console.error(`${provider} sign in failed:`, error);
        throw error;
    }
};

// Example: Sign out
export const signOut = async () => {
    try {
        await authClient.signOut();
    } catch (error) {
        console.error("Sign out failed:", error);
        throw error;
    }
};

// Example: Get current session
export const getCurrentSession = () => {
    return authClient.useSession();
};

// Example: Make authenticated tRPC call
// The tRPC client will automatically include auth cookies via the MobileTrpcProvider
export const useAuthenticatedTodos = () => {
    // This hook will automatically include auth cookies in the request
    return trpc.todo.getAllTodos.useQuery();
};

// Example: Create a todo with authentication
export const useCreateTodo = () => {
    return trpc.todo.createTodo.useMutation();
};

// Example: Update a todo with authentication
export const useUpdateTodo = () => {
    return trpc.todo.updateTodo.useMutation();
};

// Example: Delete a todo with authentication
export const useDeleteTodo = () => {
    return trpc.todo.deleteTodo.useMutation();
};
