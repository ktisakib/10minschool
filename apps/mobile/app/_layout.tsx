import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AuthProvider } from "@/components/auth/AuthProvider";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MobileTrpcProvider } from "@/lib/trpc-provider";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    if (!loaded) {
        // Async font loading only occurs in development.
        return null;
    }

    // Get tRPC URL with fallback for development
    const trpcUrl = process.env.EXPO_PUBLIC_TRPC_URL || "http://localhost:3000/api/trpc";

    return (
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <MobileTrpcProvider url={trpcUrl}>
                <AuthProvider>
                    <SafeAreaView style={{ flex: 1 }}>
                        <Stack>
                            <Stack.Screen name="index" options={{ headerShown: false }} />
                            <Stack.Screen name="auth" options={{ headerShown: false }} />
                            <Stack.Screen name="CreateTodo" options={{ headerShown: false }} />
                            <Stack.Screen name="+not-found" />
                        </Stack>
                    </SafeAreaView>
                </AuthProvider>
            </MobileTrpcProvider>
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}
