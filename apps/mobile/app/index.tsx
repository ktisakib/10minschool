import { useAuth } from "@/components/auth/AuthProvider";
import { trpc } from "@enterprise/trpc/client";
import { router, useFocusEffect } from "expo-router";
import React from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import CreateTodo from "./CreateTodo";

type Todo = {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    createdAt: string;
    dueDate?: string;
    priority?: 'low' | 'medium' | 'high';
};

export default function TodosScreen() {
    const { session, signOut, loading } = useAuth();
    const { data: todos } = trpc.todo.getAllTodos.useQuery();
    const utils = trpc.useUtils();

    // Redirect to auth if not authenticated - use useFocusEffect to ensure router is ready
    useFocusEffect(
        React.useCallback(() => {
            if (!loading && !session?.user) {
                router.replace('/sign-in');
            }
        }, [session, loading])
    );

    const updateMutation = trpc.todo.updateTodo.useMutation({
        onSuccess: () => utils.todo.getAllTodos.invalidate(),
    });

    const deleteMutation = trpc.todo.deleteTodo.useMutation({
        onSuccess: () => utils.todo.getAllTodos.invalidate(),
    });

    const handleToggle = (todoId: string, completed: boolean) => {
        updateMutation.mutate({ id: todoId, data: { completed: !completed } });
    };

    const handleDelete = (todoId: string) => {
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this todo?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => deleteMutation.mutate({ id: todoId }),
                },
            ]
        );
    };

    const handleSignOut = async () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Sign Out",
                    style: "destructive",
                    onPress: async () => {
                        await signOut();
                        router.replace('/sign-in');
                    }
                },
            ]
        );
    };

    // Show loading screen while checking auth
    if (loading) {
        return (
            <View style={[styles.container, styles.centered]}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    // Show loading or auth check
    if (!session?.user) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Todos</Text>
                <View style={styles.headerActions}>
                    <Text style={styles.userName}>Welcome, {session.user.name || session.user.email}</Text>
                    <TouchableOpacity
                        style={styles.signOutButton}
                        onPress={handleSignOut}
                    >
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                {todos?.map((todo: Todo) => (
                    <View key={todo.id} style={styles.todoContainer}>
                        <View style={styles.todoContent}>
                            <Text style={[
                                styles.todoName,
                                todo.completed && styles.completedText
                            ]}>
                                {todo.name}
                            </Text>
                            {todo.description && (
                                <Text style={styles.todoDescription}>
                                    {todo.description}
                                </Text>
                            )}
                            <View style={styles.todoMeta}>
                                {todo.priority && (
                                    <Text style={[
                                        styles.priority,
                                        todo.priority === 'low' && styles.priorityLOW,
                                        todo.priority === 'medium' && styles.priorityMEDIUM,
                                        todo.priority === 'high' && styles.priorityHIGH,
                                    ]}>
                                        {todo.priority}
                                    </Text>
                                )}
                                {todo.dueDate && (
                                    <Text style={styles.dueDate}>
                                        Due: {new Date(todo.dueDate).toLocaleDateString()}
                                    </Text>
                                )}
                            </View>
                        </View>
                        <View style={styles.todoActions}>
                            <Switch
                                value={todo.completed}
                                onValueChange={() => handleToggle(todo.id, todo.completed)}
                            />
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDelete(todo.id)}
                            >
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {!todos?.length && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateText}>No todos yet!</Text>
                        <Text style={styles.emptyStateSubtext}>
                            Create your first todo below.
                        </Text>
                    </View>
                )}
            </ScrollView>

            <CreateTodo />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    header: {
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: 60,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
    },
    headerActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    userName: {
        fontSize: 14,
        color: "#666",
        flex: 1,
    },
    signOutButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: "#f0f0f0",
        borderRadius: 6,
    },
    signOutText: {
        color: "#666",
        fontSize: 14,
        fontWeight: "500",
    },
    scrollView: {
        flex: 1,
        padding: 16,
    },
    todoContainer: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    todoContent: {
        flex: 1,
        marginRight: 16,
    },
    todoName: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 4,
    },
    completedText: {
        textDecorationLine: "line-through",
        color: "#999",
    },
    todoDescription: {
        fontSize: 14,
        color: "#666",
        marginBottom: 8,
    },
    todoMeta: {
        flexDirection: "row",
        gap: 12,
    },
    priority: {
        fontSize: 12,
        fontWeight: "600",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        textTransform: "uppercase",
    },
    priorityLOW: {
        backgroundColor: "#e7f3ff",
        color: "#0066cc",
    },
    priorityMEDIUM: {
        backgroundColor: "#fff3cd",
        color: "#856404",
    },
    priorityHIGH: {
        backgroundColor: "#f8d7da",
        color: "#721c24",
    },
    dueDate: {
        fontSize: 12,
        color: "#666",
    },
    todoActions: {
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "#dc3545",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    deleteButtonText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
    emptyState: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    emptyStateText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333",
        marginBottom: 8,
    },
    emptyStateSubtext: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },
    centered: {
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        fontSize: 16,
        color: "#666",
        fontWeight: "500",
    },
});
