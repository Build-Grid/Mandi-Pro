import Link from "next/link";

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f7f3ea] px-6 text-center">
            {/* Soft background gradients */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 20%, rgba(212,180,120,0.12), transparent 60%),
                        radial-gradient(circle at 80% 80%, rgba(120,160,90,0.08), transparent 60%)
                    `,
                }}
            />

            {/* Decorative leaf accents */}
            <svg
                className="absolute -top-12 -left-12 opacity-[0.05] rotate-[-20deg]"
                width="260"
                height="260"
                viewBox="0 0 220 220"
                fill="none"
            >
                <ellipse
                    cx="110"
                    cy="110"
                    rx="95"
                    ry="38"
                    fill="#5c7c3a"
                    transform="rotate(-18 110 110)"
                />
            </svg>

            <svg
                className="absolute -bottom-12 -right-12 opacity-[0.05] rotate-180"
                width="260"
                height="260"
                viewBox="0 0 220 220"
                fill="none"
            >
                <ellipse
                    cx="110"
                    cy="110"
                    rx="95"
                    ry="38"
                    fill="#5c7c3a"
                    transform="rotate(-18 110 110)"
                />
            </svg>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-6 max-w-md">
                {/* 404 Number */}
                <h1 className="text-[72px] font-semibold text-[#3a7d5d] tracking-tight">
                    404
                </h1>

                {/* Message */}
                <div>
                    <h2 className="text-xl font-medium text-[#2f2e2a]">
                        Page not found
                    </h2>
                    <p className="mt-2 text-sm text-[#9a978f]">
                        The page you’re looking for doesn’t exist or may have
                        been moved.
                    </p>
                </div>

                {/* Wheat illustration */}
                <div className="flex items-end gap-2 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center origin-bottom animate-[sway-soft_3s_ease-in-out_infinite]"
                            style={{ animationDelay: `${i * 0.2}s` }}
                        >
                            <div
                                className="w-2.5 rounded-[6px_6px_2px_2px]"
                                style={{
                                    height: 18 + i * 4,
                                    background: "#c9a24a",
                                }}
                            />
                            <div
                                className="w-0.5 bg-[#8aa06b] rounded-sm"
                                style={{ height: 30 + i * 5 }}
                            />
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full justify-center">
                    <Link
                        href="/"
                        className="rounded-lg bg-[#3a7d5d] px-5 py-2.5 text-sm text-white shadow-sm hover:bg-[#2f6a50] transition"
                    >
                        Go to Home
                    </Link>

                    <Link
                        href="/dashboard"
                        className="rounded-lg border border-[#d6d0c2] px-5 py-2.5 text-sm text-[#5f5c55] hover:bg-[#ece6d8] transition"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
