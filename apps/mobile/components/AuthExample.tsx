import { authClient } from '@/lib/auth';
import { trpc } from '@enterprise/trpc/client';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AuthExample() {
    // Get current session
    const { data: session, isPending } = authClient.useSession();

    // Use authenticated tRPC queries
    const { data: todos, isLoading: todosLoading } = trpc.todo.getAllTodos.useQuery(
        undefined,
        {
            // Only run query if user is authenticated
            enabled: !!session?.user
        }
    );

    // Create todo mutation
    const createTodoMutation = trpc.todo.createTodo.useMutation({
        onSuccess: () => {
            // Invalidate todos query to refresh the list
            trpc.useUtils().todo.getAllTodos.invalidate();
        }
    });

    const handleSignOut = async () => {
        try {
            await authClient.signOut();
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };

    const handleCreateTodo = () => {
        createTodoMutation.mutate({
            name: 'New Todo from Mobile',
            description: 'Created via mobile app with Better Auth + tRPC',
            completed: false
        });
    };

    if (isPending) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!session?.user) {
        return (
            <View style={styles.container}>
                <Text>Please sign in to continue</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome, {session.user.name}!</Text>

            <TouchableOpacity style={styles.button} onPress={handleCreateTodo}>
                <Text style={styles.buttonText}>Create Todo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>

            <View style={styles.todosSection}>
                <Text style={styles.sectionTitle}>Your Todos:</Text>
                {todosLoading ? (
                    <Text>Loading todos...</Text>
                ) : (
                    todos?.map((todo) => (
                        <Text key={todo.id} style={styles.todoItem}>
                            {todo.name} {todo.completed ? '✅' : '⏳'}
                        </Text>
                    ))
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    todosSection: {
        marginTop: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    todoItem: {
        fontSize: 16,
        padding: 10,
        backgroundColor: '#f5f5f5',
        marginBottom: 5,
        borderRadius: 4,
    },
});
