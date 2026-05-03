"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { usePreviewInvite, useAcceptInvite } from "@/features/auth/hooks";

// ✅ Format date professionally
function formatDateTime(date: string | Date) {
    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(new Date(date));
}

// ✅ Relative time (UX boost)
function getRelativeTime(date: string | Date) {
    const diff = new Date(date).getTime() - Date.now();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `in ${minutes} min`;
    if (hours < 24) return `in ${hours} hrs`;
    return `in ${days} days`;
}

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

function isExpiringSoonFn(expiry: string) {
    const now = Date.now();
    return new Date(expiry).getTime() - now < 86400000;
}

export default function AcceptInvitePage() {
    const search = useSearchParams();
    const token = search?.get("token") || "";

    const {
        data: preview,
        isError: previewError,
        isPending: previewPending,
    } = usePreviewInvite(token);

    const accept = useAcceptInvite();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    const validate = () => {
        if (!firstName || !lastName || !password || !confirmPassword) {
            return "All fields are required";
        }
        if (password.length < 6) {
            return "Password must be at least 6 characters";
        }
        if (password !== confirmPassword) {
            return "Passwords do not match";
        }
        return null;
    };

    const isExpiringSoon = preview
        ? isExpiringSoonFn(preview.expiresAt)
        : false;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        accept.mutate({ token, firstName, lastName, password });
    };

    // ❌ Invalid token
    if (!token) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f7f3ea] px-6 text-center">
                <div>
                    <h1 className="text-2xl font-semibold text-[#2f2e2a]">
                        Invalid invite link
                    </h1>
                    <p className="mt-2 text-sm text-[#6f6c64]">
                        This invitation link is not valid or has expired.
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
                        radial-gradient(circle at 20% 20%, rgba(212,180,120,0.15), transparent 60%),
                        radial-gradient(circle at 80% 80%, rgba(120,160,90,0.10), transparent 60%)
                    `,
                }}
            />

            <main className="relative z-10 mx-auto w-full max-w-md">
                {/* Heading */}
                <h1 className="text-2xl font-semibold text-[#2f2e2a]">
                    Accept Invitation
                </h1>
                <p className="mt-2 text-sm text-[#6f6c64]">
                    You&apos;re invited to join a firm. Complete your profile to
                    continue.
                </p>

                {/* Loading */}
                {previewPending && (
                    <p className="mt-6 text-sm text-[#6f6c64]">
                        Loading invitation...
                    </p>
                )}

                {/* Error */}
                {previewError && (
                    <p className="mt-6 text-sm text-red-600">
                        Unable to load invitation details.
                    </p>
                )}

                {/* 🌟 Enhanced Invite Card */}
                {preview && (
                    <div className="mt-6 rounded-2xl bg-white/85 backdrop-blur-md border border-[#e5dfd0] shadow-md p-6 space-y-5">
                        {/* Header */}
                        <div>
                            <p className="text-xs uppercase tracking-wide text-[#9a978f]">
                                Invitation
                            </p>
                            <h2 className="text-lg font-semibold text-[#2f2e2a]">
                                Join {preview.firmName}
                            </h2>
                        </div>

                        {/* Role */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-[#6f6c64]">Role</span>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
                                {preview.role}
                            </span>
                        </div>

                        {/* Email */}
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[#6f6c64]">Email</span>
                            <span className="font-medium text-[#2f2e2a]">
                                {preview.email}
                            </span>
                        </div>

                        {/* Expiry */}
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[#6f6c64]">Expires</span>
                            <div className="text-right">
                                <p
                                    className={`font-medium ${
                                        isExpiringSoon
                                            ? "text-red-600"
                                            : "text-[#b45309]"
                                    }`}
                                >
                                    {formatDateTime(preview.expiresAt)}
                                </p>
                                <p className="text-xs text-[#9a978f]">
                                    {getRelativeTime(preview.expiresAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form */}
                <div className="mt-8 rounded-2xl border border-[#e5dfd0] bg-white/70 backdrop-blur-sm p-6 shadow-sm">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-sm text-[#5f5c55]">
                                First name
                            </label>
                            <input
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                    setError(null);
                                }}
                                className="mt-1 w-full rounded-lg border border-[#d6d0c2] px-3 py-2 text-sm focus:ring-2 focus:ring-[#3a7d5d]"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-[#5f5c55]">
                                Last name
                            </label>
                            <input
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                    setError(null);
                                }}
                                className="mt-1 w-full rounded-lg border border-[#d6d0c2] px-3 py-2 text-sm focus:ring-2 focus:ring-[#3a7d5d]"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-[#5f5c55]">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(null);
                                }}
                                className="mt-1 w-full rounded-lg border border-[#d6d0c2] px-3 py-2 text-sm focus:ring-2 focus:ring-[#3a7d5d]"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-[#5f5c55]">
                                Confirm password
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setError(null);
                                }}
                                className="mt-1 w-full rounded-lg border border-[#d6d0c2] px-3 py-2 text-sm focus:ring-2 focus:ring-[#3a7d5d]"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

                        {accept.isError && (
                            <p className="text-sm text-red-600">
                                {getErrorMessage(accept.error)}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={accept.isPending}
                            className="w-full rounded-lg bg-[#3a7d5d] px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-[#2f6a50] transition disabled:opacity-60"
                        >
                            {accept.isPending
                                ? "Accepting..."
                                : "Accept Invitation"}
                        </button>
                    </form>
                </div>

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
