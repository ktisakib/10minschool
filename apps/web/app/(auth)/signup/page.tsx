"use client";

import { authClient } from "@/lib/client";
import { Button } from "@enterprise/ui/components/button";
import { Input } from "@enterprise/ui/components/input";
import { Label } from "@enterprise/ui/components/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword || !name) {
            setError("Please fill in all fields");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const result = await authClient.signUp.email({
                email,
                password,
                name,
            });

            if (result.error) {
                setError(result.error.message || "Sign up failed");
            } else {
                router.push("/");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleSocialSignUp = async (provider: "google" | "github" | "discord") => {
        try {
            await authClient.signIn.social({
                provider,
                callbackURL: "/",
            });
        } catch (err: any) {
            setError(err.message || `Failed to sign up with ${provider}`);
        }
    };

    return (
        <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Create Account</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Enter your information to create an account
                </p>
            </div>

            <form onSubmit={handleEmailSignUp} className="space-y-4">
                {error && (
                    <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                    />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Creating account..." : "Create Account"}
                </Button>
            </form>

            <div className="space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                    <Button
                        variant="outline"
                        onClick={() => handleSocialSignUp("google")}
                        disabled={loading}
                    >
                        Google
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleSocialSignUp("github")}
                        disabled={loading}
                    >
                        GitHub
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => handleSocialSignUp("discord")}
                        disabled={loading}
                    >
                        Discord
                    </Button>
                </div>
            </div>

            <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/signin" className="underline">
                    Sign in
                </Link>
            </div>
        </div>
    );
}
