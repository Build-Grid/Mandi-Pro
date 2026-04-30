"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import { useLogin, useForgotPassword } from "@/features/auth/hooks";
import type { LoginDto, ForgotPasswordDto } from "@/features/auth/types";
import { logger } from "@/lib/logger";

function validateLoginForm(email: string, password: string): string[] {
    const errors: string[] = [];
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push("Please enter a valid email");
    }
    if (!password || password.length < 1) {
        errors.push("Password is required");
    }
    return errors;
}

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<string | null>(null);

    const loginMutation = useLogin();
    const forgotPasswordMutation = useForgotPassword();

    const isLoading =
        Boolean(loginMutation.isPending) ||
        Boolean(forgotPasswordMutation.isPending);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formErrors = validateLoginForm(email, password);
        if (formErrors.length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors([]);
        setStatus(null);

        try {
            const credentials: LoginDto = { email, password };
            await loginMutation.mutateAsync(credentials);
            setStatus("Sign in successful! Redirecting...");
        } catch (err) {
            logger.error("Login form submission error:", err);
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Sign in failed. Please try again.";
            setStatus(errorMessage);
        }
    }

    async function handleForgot() {
        if (!email) {
            setStatus("Enter your email above to receive a reset link.");
            return;
        }

        setStatus(null);

        try {
            const forgotData: ForgotPasswordDto = { email };
            await forgotPasswordMutation.mutateAsync(forgotData);
            setStatus("If the email exists, a reset link was sent.");
        } catch (err) {
            logger.error("Forgot password submission error:", err);
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Failed to send reset email. Please try again.";
            setStatus(errorMessage);
        }
    }

    return (
        <form onSubmit={onSubmit} className="w-full space-y-6">
            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-[#1A2E1A] mb-2">
                    Email Address
                </label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!!isLoading}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#D1D5DB] bg-white text-[#1A2E1A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3A7D44] focus:ring-2 focus:ring-[#3A7D44]/20 disabled:opacity-50"
                        placeholder="you@business.com"
                    />
                </div>
            </div>

            {/* Password */}
            <div>
                <label className="block text-sm font-medium text-[#1A2E1A] mb-2">
                    Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={!!isLoading}
                        className="w-full pl-10 pr-12 py-3 rounded-lg border border-[#D1D5DB] bg-white text-[#1A2E1A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3A7D44] focus:ring-2 focus:ring-[#3A7D44]/20 disabled:opacity-50"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={!!isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#1A2E1A] transition disabled:opacity-50"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={handleForgot}
                    disabled={!!isLoading}
                    className="text-sm font-medium text-[#3A7D44] hover:text-[#2D5A27] transition disabled:opacity-50"
                >
                    Forgot password?
                </button>
            </div>

            {/* Errors */}
            {errors.length > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <ul className="space-y-1">
                        {errors.map((error, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-red-700"
                            >
                                <span>•</span>
                                <span>{error}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!!isLoading}
                className="w-full py-3 rounded-xl bg-[#D97706] text-white font-semibold transition hover:bg-[#B45309] disabled:opacity-70 active:scale-[0.98] flex items-center justify-center gap-2"
            >
                {!!isLoading ? (
                    <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing in...
                    </>
                ) : (
                    <>
                        Sign in <span>→</span>
                    </>
                )}
            </button>

            {/* Status Message */}
            {status && (
                <div
                    className={`p-3 rounded-lg text-sm text-center ${
                        status.includes("error") ||
                        status.includes("failed") ||
                        status.includes("Error")
                            ? "bg-red-50 text-red-700"
                            : "bg-emerald-50 text-emerald-700"
                    }`}
                >
                    {status}
                </div>
            )}

            {/* Sign Up Link */}
            <p className="text-center text-sm text-[#6B7280]">
                New here?{" "}
                <a
                    href="/register"
                    className="font-semibold text-[#2D6A2D] hover:underline transition"
                >
                    Create an account
                </a>
            </p>
        </form>
    );
}
