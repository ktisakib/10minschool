import { authClient } from '@/lib/auth';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Error', 'Password must be at least 8 characters long');
            return;
        }

        setLoading(true);
        try {
            const result = await authClient.signUp.email({
                email,
                password,
                name,
            });

            if (result.error) {
                Alert.alert('Sign Up Failed', result.error.message);
            } else {
                // Successfully signed up, navigate to main app
                Alert.alert(
                    'Success',
                    'Account created successfully!',
                    [{ text: 'OK', onPress: () => router.replace('/') }]
                );
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialSignUp = async (provider: 'google' | 'github' | 'discord') => {
        setLoading(true);
        try {
            await authClient.signIn.social({
                provider,
                callbackURL: '/', // Will be converted to deep link
            });
        } catch (error: any) {
            Alert.alert('Error', error.message || `Failed to sign up with ${provider}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>Sign up to get started</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={setName}
                                placeholder="Enter your full name"
                                autoCapitalize="words"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Enter your email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                placeholder="Enter your password"
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <TextInput
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                placeholder="Confirm your password"
                                secureTextEntry
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleSignUp}
                            disabled={loading}
                        >
                            <Text style={styles.buttonText}>
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <TouchableOpacity
                            style={[styles.socialButton, styles.googleButton]}
                            onPress={() => handleSocialSignUp('google')}
                            disabled={loading}
                        >
                            <Text style={styles.socialButtonText}>Continue with Google</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.socialButton, styles.githubButton]}
                            onPress={() => handleSocialSignUp('github')}
                            disabled={loading}
                        >
                            <Text style={styles.socialButtonText}>Continue with GitHub</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.socialButton, styles.discordButton]}
                            onPress={() => handleSocialSignUp('discord')}
                            disabled={loading}
                        >
                            <Text style={styles.socialButtonText}>Continue with Discord</Text>
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Already have an account?{' '}
                                <Text
                                    style={styles.link}
                                    onPress={() => router.push('/sign-in')}
                                >
                                    Sign In
                                </Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#1f2937',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
        color: '#6b7280',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
        color: '#374151',
    },
    input: {
        borderWidth: 1,
        borderColor: '#d1d5db',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#3b82f6',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonDisabled: {
        backgroundColor: '#9ca3af',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#6b7280',
        fontSize: 14,
    },
    socialButton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#d1d5db',
    },
    googleButton: {
        backgroundColor: '#fff',
    },
    githubButton: {
        backgroundColor: '#24292e',
    },
    discordButton: {
        backgroundColor: '#5865f2',
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#374151',
    },
    footer: {
        marginTop: 24,
        alignItems: 'center',
    },
    footerText: {
        color: '#6b7280',
        fontSize: 14,
    },
    link: {
        color: '#3b82f6',
        fontWeight: '500',
    },
});
