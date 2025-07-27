import { authClient } from '@/lib/auth';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function AuthScreen() {
    const handleDiscordSignIn = async () => {
        await authClient.signIn.social({ provider: 'discord' });
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({ provider: 'google' });
    };

    const handleGitHubSignIn = async () => {
        await authClient.signIn.social({ provider: 'github' });
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome</Text>
                <Text style={styles.subtitle}>Choose your sign-in method</Text>

                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={handleDiscordSignIn}>
                        <Text style={styles.buttonText}>Continue with Discord</Text>
                    </Pressable>

                    <Pressable style={styles.button} onPress={handleGoogleSignIn}>
                        <Text style={styles.buttonText}>Continue with Google</Text>
                    </Pressable>

                    <Pressable style={styles.button} onPress={handleGitHubSignIn}>
                        <Text style={styles.buttonText}>Continue with GitHub</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        width: '100%',
        maxWidth: 400,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 32,
    },
    buttonContainer: {
        gap: 12,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
