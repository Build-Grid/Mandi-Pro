import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f7f3ea] px-6 py-16 text-stone-900">
            {/* Background gradients */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `
                        radial-gradient(circle at 20% 20%, rgba(212,180,120,0.12), transparent 60%),
                        radial-gradient(circle at 80% 80%, rgba(120,160,90,0.08), transparent 60%)
                    `,
                }}
            />

            {/* Decorative leaves */}
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
            <main className="relative z-10 mx-auto w-full max-w-3xl">
                <h1 className="text-3xl font-semibold tracking-tight text-[#2f2e2a]">
                    Privacy Policy
                </h1>

                <p className="mt-4 text-base leading-7 text-[#6f6c64]">
                    Your privacy matters. This document explains what we
                    collect, why we collect it, and how we protect your
                    information.
                </p>

                {/* Sections */}
                <section className="mt-10 space-y-6">
                    <div className="rounded-xl border border-[#e5dfd0] bg-white/60 backdrop-blur-sm p-5 shadow-sm">
                        <h2 className="text-lg font-medium text-[#2f2e2a]">
                            Information we collect
                        </h2>
                        <p className="mt-2 text-sm text-[#6f6c64]">
                            We collect account details such as name and email,
                            firm-related information, transaction data, and
                            limited analytics to improve the platform.
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#e5dfd0] bg-white/60 backdrop-blur-sm p-5 shadow-sm">
                        <h2 className="text-lg font-medium text-[#2f2e2a]">
                            How we use data
                        </h2>
                        <p className="mt-2 text-sm text-[#6f6c64]">
                            Data is used to operate services, process
                            transactions, provide support, and enhance user
                            experience. We do not sell personal information.
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#e5dfd0] bg-white/60 backdrop-blur-sm p-5 shadow-sm">
                        <h2 className="text-lg font-medium text-[#2f2e2a]">
                            Data retention & security
                        </h2>
                        <p className="mt-2 text-sm text-[#6f6c64]">
                            We retain data only as long as necessary for
                            business and legal purposes, and apply
                            industry-standard security practices to protect it.
                        </p>
                    </div>
                </section>

                {/* Footer actions */}
                <div className="mt-10 flex flex-col sm:flex-row gap-3">
                    <Link
                        href="/"
                        className="rounded-lg bg-[#3a7d5d] px-5 py-2.5 text-sm text-white shadow-sm hover:bg-[#2f6a50] transition"
                    >
                        Back to Home
                    </Link>

                    <Link
                        href="/terms"
                        className="rounded-lg border border-[#d6d0c2] px-5 py-2.5 text-sm text-[#5f5c55] hover:bg-[#ece6d8] transition"
                    >
                        Terms & Conditions
                    </Link>

                    <Link
                        href="/cookies"
                        className="rounded-lg border border-[#d6d0c2] px-5 py-2.5 text-sm text-[#5f5c55] hover:bg-[#ece6d8] transition"
                    >
                        Cookie Policy
                    </Link>
                </div>

                {/* Optional meta */}
                <p className="mt-6 text-xs text-[#9a978f]">
                    Last updated: May 2026
                </p>
            </main>
        </div>
    );
}
