"use client";

import { authClient } from "@/lib/client";
import { Button } from "@enterprise/ui/components/button";
import { Input } from "@enterprise/ui/components/input";
import { Label } from "@enterprise/ui/components/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const result = await authClient.signIn.email({
                email,
                password,
            });

            if (result.error) {
                setError(result.error.message || "Sign in failed");
            } else {
                router.push("/");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDiscordSignIn = async () => {
        await authClient.signIn.social({ provider: "discord" });
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({ provider: "google" });
    };

    const handleGitHubSignIn = async () => {
        await authClient.signIn.social({ provider: "github" });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
                    <p className="mt-2 text-gray-600">Sign in to your account</p>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={handleEmailSignIn} className="space-y-4">
                    {error && (
                        <div className="rounded-md bg-red-50 border border-red-200 p-3">
                            <p className="text-sm text-red-700">{error}</p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                    </div>
                </div>

                {/* Social Sign-in Options */}
                <div className="space-y-3">
                    <Button
                        onClick={handleDiscordSignIn}
                        className="w-full"
                        variant="outline"
                        disabled={loading}
                    >
                        Continue with Discord
                    </Button>

                    <Button
                        onClick={handleGoogleSignIn}
                        className="w-full"
                        variant="outline"
                        disabled={loading}
                    >
                        Continue with Google
                    </Button>

                    <Button
                        onClick={handleGitHubSignIn}
                        className="w-full"
                        variant="outline"
                        disabled={loading}
                    >
                        Continue with GitHub
                    </Button>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/auth/sign-up"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
