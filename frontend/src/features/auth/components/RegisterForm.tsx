"use client";

import { useState } from "react";
import {
    Eye,
    EyeOff,
    Building2,
    AtSign,
    Mail,
    Lock,
    Check,
    X,
} from "lucide-react";

import { useRegister } from "@/features/auth/hooks";
import type { RegisterDto } from "@/features/auth/types";
import { logger } from "@/lib/logger";

function getPasswordStrength(pwd: string): {
    score: number;
    label: string;
    color: string;
} {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    return score <= 1
        ? { score, label: "Weak", color: "bg-red-500" }
        : score <= 2
          ? { score, label: "Medium", color: "bg-yellow-500" }
          : { score, label: "Strong", color: "bg-emerald-500" };
}

function validateForm(values: {
    firmName: string;
    username: string;
    firstName: string;
    email: string;
    password: string;
    confirm: string;
}): string[] {
    const errors: string[] = [];
    if (!values.firmName?.trim() || values.firmName.length < 2)
        errors.push("Firm name must be at least 2 characters");
    if (!values.username?.trim() || values.username.length < 3)
        errors.push("Username must be at least 3 characters");
    if (!/^[a-zA-Z0-9_]+$/.test(values.username || ""))
        errors.push(
            "Username can only contain letters, numbers, and underscores",
        );
    if (!values.firstName?.trim()) errors.push("First name is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email || ""))
        errors.push("Please enter a valid email");
    if (!values.password || values.password.length < 8)
        errors.push("Password must be at least 8 characters");
    if (!/[A-Z]/.test(values.password || ""))
        errors.push("Password must contain at least one uppercase letter");
    if (!/[0-9]/.test(values.password || ""))
        errors.push("Password must contain at least one number");
    if (values.password !== values.confirm)
        errors.push("Passwords do not match");
    return errors;
}

export default function RegisterForm() {
    const [firmName, setFirmName] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [status, setStatus] = useState<string | null>(null);

    const registerMutation = useRegister();
    const isLoading = registerMutation.isPending;

    const passwordStrength = getPasswordStrength(password);
    const passwordsMatch = password && confirm && password === confirm;

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        const formErrors = validateForm({
            firmName,
            username,
            firstName,
            email,
            password,
            confirm,
        });
        if (formErrors.length > 0) {
            setErrors(formErrors);
            return;
        }

        setErrors([]);
        setStatus(null);

        try {
            const registerData: RegisterDto = {
                firmName,
                username,
                firstName,
                lastName,
                email,
                password,
            };
            await registerMutation.mutateAsync(registerData);
            setStatus("Account created! Redirecting to dashboard...");
        } catch (err) {
            logger.error("Register form submission error:", err);
            const errorMessage =
                err instanceof Error
                    ? err.message
                    : "Registration failed. Please try again.";
            setStatus(errorMessage);
        }
    }

    return (
        <form onSubmit={onSubmit} className="w-full space-y-6">
            {/* Firm Name */}
            <div>
                <label className="block text-sm font-medium text-[#1A2E1A] mb-2">
                    Firm / Business Name
                </label>
                <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
                    <input
                        type="text"
                        required
                        value={firmName}
                        onChange={(e) => setFirmName(e.target.value)}
                        disabled={isLoading}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#D1D5DB] bg-white text-[#1A2E1A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3A7D44] focus:ring-2 focus:ring-[#3A7D44]/20 disabled:opacity-50"
                        placeholder="BuildGrid Pvt Ltd"
                    />
                </div>
            </div>

            {/* Username */}
            <div>
                <label className="block text-sm font-medium text-[#1A2E1A] mb-2">
                    Username
                </label>
                <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
                    <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#D1D5DB] bg-white text-[#1A2E1A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3A7D44] focus:ring-2 focus:ring-[#3A7D44]/20 disabled:opacity-50"
                        placeholder="atharva_admin"
                    />
                </div>
            </div>

            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-[#1A2E1A] mb-2">
                        First Name
                    </label>
                    <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] bg-white text-[#1A2E1A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3A7D44] focus:ring-2 focus:ring-[#3A7D44]/20 disabled:opacity-50"
                        placeholder="Atharva"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-[#1A2E1A] mb-2">
                        Last Name
                    </label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={isLoading}
                        className="w-full px-4 py-3 rounded-lg border border-[#D1D5DB] bg-white text-[#1A2E1A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3A7D44] focus:ring-2 focus:ring-[#3A7D44]/20 disabled:opacity-50"
                        placeholder="(optional)"
                    />
                </div>
            </div>

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
                        disabled={isLoading}
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
                        disabled={isLoading}
                        className="w-full pl-10 pr-12 py-3 rounded-lg border border-[#D1D5DB] bg-white text-[#1A2E1A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3A7D44] focus:ring-2 focus:ring-[#3A7D44]/20 disabled:opacity-50"
                        placeholder="Minimum 8 characters"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#1A2E1A] transition disabled:opacity-50"
                    >
                        {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
                {password && (
                    <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
                                <div
                                    className={`h-full ${passwordStrength.color} transition-all`}
                                    style={{
                                        width: `${(passwordStrength.score / 4) * 100}%`,
                                    }}
                                />
                            </div>
                            <span className="text-xs font-medium text-[#6B7280]">
                                {passwordStrength.label}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label className="block text-sm font-medium text-[#1A2E1A] mb-2">
                    Confirm Password
                </label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
                    <input
                        type={showConfirm ? "text" : "password"}
                        required
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        disabled={isLoading}
                        className="w-full pl-10 pr-12 py-3 rounded-lg border border-[#D1D5DB] bg-white text-[#1A2E1A] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#3A7D44] focus:ring-2 focus:ring-[#3A7D44]/20 disabled:opacity-50"
                        placeholder="Re-enter your password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#1A2E1A] transition disabled:opacity-50"
                    >
                        {showConfirm ? (
                            <EyeOff className="h-5 w-5" />
                        ) : (
                            <Eye className="h-5 w-5" />
                        )}
                    </button>
                </div>
                {confirm && (
                    <div className="mt-2 flex items-center gap-2">
                        {passwordsMatch ? (
                            <>
                                <Check className="h-4 w-4 text-emerald-500" />
                                <span className="text-xs text-emerald-600">
                                    Passwords match
                                </span>
                            </>
                        ) : (
                            <>
                                <X className="h-4 w-4 text-red-500" />
                                <span className="text-xs text-red-600">
                                    Passwords do not match
                                </span>
                            </>
                        )}
                    </div>
                )}
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
                                <X className="h-4 w-4 mt-0.5 shrink-0" />
                                <span>{error}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#D97706] text-white font-semibold transition hover:bg-[#B45309] disabled:opacity-70 active:scale-[0.98] flex items-center justify-center gap-2"
            >
                {isLoading ? (
                    <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating account...
                    </>
                ) : (
                    <>
                        Create Account <span>→</span>
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

            {/* Sign In Link */}
            <p className="text-center text-sm text-[#6B7280]">
                Already have an account?{" "}
                <a
                    href="/login"
                    className="font-semibold text-[#2D6A2D] hover:underline transition"
                >
                    Sign in
                </a>
            </p>
        </form>
    );
}
