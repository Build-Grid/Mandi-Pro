"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleGlobalError } from "@/lib/errors";

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
    const router = useRouter();

    useEffect(() => {
        handleGlobalError(error);
    }, [error]);

    return (
        <div
            className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
            style={{ background: "#f5f0e8" }}
        >
            {/* Radial bg tints */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 20%, rgba(180,162,109,0.12) 0%, transparent 55%),
                        radial-gradient(circle at 80% 80%, rgba(107,142,35,0.08) 0%, transparent 50%)
                    `,
                }}
            />

            {/* Corner leaves */}
            <svg
                className="absolute opacity-[0.055]"
                style={{ top: -10, left: -10, transform: "rotate(-30deg)" }}
                width="180"
                height="180"
                viewBox="0 0 220 220"
                fill="none"
            >
                <ellipse
                    cx="110"
                    cy="110"
                    rx="90"
                    ry="40"
                    fill="#3b6d11"
                    transform="rotate(-20 110 110)"
                />
                <line
                    x1="20"
                    y1="110"
                    x2="200"
                    y2="110"
                    stroke="#3b6d11"
                    strokeWidth="3"
                />
            </svg>
            <svg
                className="absolute opacity-[0.055]"
                style={{ bottom: -10, right: -10, transform: "rotate(150deg)" }}
                width="180"
                height="180"
                viewBox="0 0 220 220"
                fill="none"
            >
                <ellipse
                    cx="110"
                    cy="110"
                    rx="90"
                    ry="40"
                    fill="#3b6d11"
                    transform="rotate(-20 110 110)"
                />
                <line
                    x1="20"
                    y1="110"
                    x2="200"
                    y2="110"
                    stroke="#3b6d11"
                    strokeWidth="3"
                />
            </svg>

            {/* Card */}
            <div
                className="relative z-10 w-full max-w-md rounded-3xl p-8"
                style={{
                    background: "#fff",
                    border: "0.5px solid rgba(180,162,109,0.35)",
                    boxShadow:
                        "0 8px 40px rgba(45,106,79,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                }}
            >
                {/* Icon */}
                <div
                    className="mb-5 flex h-13 w-13 items-center justify-center rounded-[14px]"
                    style={{ background: "#fcebeb" }}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#a32d2d"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <circle
                            cx="12"
                            cy="16"
                            r="0.6"
                            fill="#a32d2d"
                            stroke="none"
                        />
                    </svg>
                </div>

                {/* Text */}
                <p
                    className="text-[11px] font-medium uppercase tracking-widest"
                    style={{ color: "#a32d2d" }}
                >
                    Application error
                </p>
                <h1
                    className="mt-1.5 text-[22px] font-medium tracking-tight"
                    style={{ color: "#2c2c2a" }}
                >
                    Something went wrong
                </h1>

                {/* Error message */}
                <div
                    className="mt-4 rounded-[10px] px-3 py-2.5 text-[13px] leading-relaxed wrap-break-word"
                    style={{
                        background: "#f5f0e8",
                        border: "0.5px solid rgba(180,162,109,0.30)",
                        color: "#888780",
                        fontFamily: "var(--font-geist-mono), monospace",
                    }}
                >
                    {error.message || "An unexpected error occurred."}
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-2.5">
                    <button
                        type="button"
                        onClick={reset}
                        className="flex-1 rounded-full py-2.5 text-[13.5px] font-medium text-white transition-colors"
                        style={{ background: "#2d6a4f" }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.background = "#1e4d39")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.background = "#2d6a4f")
                        }
                    >
                        Try again
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/")}
                        className="rounded-full px-5 py-2.5 text-[13.5px] transition-colors"
                        style={{
                            border: "0.5px solid rgba(180,162,109,0.45)",
                            color: "#888780",
                            background: "transparent",
                        }}
                        onMouseOver={(e) =>
                            (e.currentTarget.style.background = "#f5f0e8")
                        }
                        onMouseOut={(e) =>
                            (e.currentTarget.style.background = "transparent")
                        }
                    >
                        Go home
                    </button>
                </div>

                {/* Digest footer */}
                {error.digest && (
                    <div
                        className="mt-5 flex items-center justify-between pt-4"
                        style={{ borderTop: "0.5px solid #f0ebe0" }}
                    >
                        <span
                            className="text-[11px]"
                            style={{ color: "#c8c1b0" }}
                        >
                            Error digest
                        </span>
                        <span
                            className="text-[11px]"
                            style={{
                                color: "#b5a98a",
                                fontFamily: "var(--font-geist-mono), monospace",
                            }}
                        >
                            {error.digest}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
