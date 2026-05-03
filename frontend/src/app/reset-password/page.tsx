"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useResetPassword } from "@/features/auth/hooks";

// ✅ Safe error extractor
function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;

    if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof (error as { message: unknown }).message === "string"
    ) {
        return (error as { message: string }).message;
    }

    return "Something went wrong";
}

export default function ResetPasswordPage() {
    const search = useSearchParams();
    const token = search?.get("token") || "";

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const reset = useResetPassword();

    const validate = () => {
        if (!newPassword || !confirmPassword) {
            return "All fields are required";
        }

        if (newPassword.length < 6) {
            return "Password must be at least 6 characters";
        }

        if (newPassword !== confirmPassword) {
            return "Passwords do not match";
        }

        return null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        reset.mutate({ token, newPassword });
    };

    // ❌ Invalid token view
    if (!token) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f7f3ea] px-6 text-center">
                <div>
                    <h1 className="text-2xl font-semibold text-[#2f2e2a]">
                        Invalid or expired link
                    </h1>
                    <p className="mt-2 text-sm text-[#6f6c64]">
                        This password reset link is not valid or has expired.
                    </p>

                    <Link
                        href="/login"
                        className="mt-4 inline-block rounded-lg bg-[#3a7d5d] px-5 py-2 text-sm text-white"
                    >
                        Back to login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f7f3ea] px-6 py-16 text-stone-900">
            {/* Background */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 20%, rgba(212,180,120,0.12), transparent 60%),
                        radial-gradient(circle at 80% 80%, rgba(120,160,90,0.08), transparent 60%)
                    `,
                }}
            />

            <main className="relative z-10 mx-auto w-full max-w-md">
                <h1 className="text-2xl font-semibold text-[#2f2e2a]">
                    Reset your password
                </h1>

                <p className="mt-2 text-sm text-[#6f6c64]">
                    Enter a new password for your account.
                </p>

                {/* Form */}
                <div className="mt-8 rounded-xl border border-[#e5dfd0] bg-white/60 backdrop-blur-sm p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* New password */}
                        <div>
                            <label className="text-sm text-[#2f2e2a]">
                                New password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setError(null);
                                }}
                                className="mt-1 w-full rounded-md border border-[#d6d0c2] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7d5d]"
                            />
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label className="text-sm text-[#2f2e2a]">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setError(null);
                                }}
                                className="mt-1 w-full rounded-md border border-[#d6d0c2] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#3a7d5d]"
                            />
                        </div>

                        {/* Validation error */}
                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

                        {/* API error */}
                        {reset.isError && (
                            <p className="text-sm text-red-600">
                                {getErrorMessage(reset.error)}
                            </p>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={reset.isPending}
                            className="w-full rounded-lg bg-[#3a7d5d] px-4 py-2 text-sm text-white hover:bg-[#2f6a50] transition disabled:opacity-60"
                        >
                            {reset.isPending
                                ? "Updating..."
                                : "Update Password"}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <Link
                        href="/login"
                        className="text-sm text-[#6f6c64] hover:underline"
                    >
                        Back to login
                    </Link>
                </div>
            </main>
        </div>
    );
}
