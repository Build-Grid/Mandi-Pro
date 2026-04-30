import Link from "next/link";

export function HeroSection() {
    return (
        <section
            id="top"
            className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24"
        >
            <div className="flex flex-col justify-center space-y-7 animate-fade-up">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-linear-to-r from-amber-50 to-white px-4 py-2 text-sm font-medium text-amber-900 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white motion-reduce:transform-none">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    Smart trading management platform for mandi businesses
                </div>

                <div className="space-y-5">
                    <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-emerald-950 sm:text-5xl lg:text-6xl">
                        Simplify your agricultural supply chain
                    </h1>
                    <p className="max-w-xl text-base leading-7 text-green-700 sm:text-lg sm:leading-8">
                        Real-time market insights, inventory tracking, and
                        seamless order management for modern mandi businesses.
                    </p>
                </div>

                <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                    <Link
                        href="/register"
                        className="rounded-full bg-linear-to-r from-amber-600 to-amber-700 px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-amber-600/30 transition duration-300 hover:-translate-y-0.5 hover:from-amber-700 hover:to-amber-800 motion-reduce:transform-none"
                    >
                        Get started
                    </Link>
                    <a
                        href="#features"
                        className="rounded-full border border-emerald-300 bg-white px-6 py-3 text-center text-sm font-semibold text-emerald-700 transition duration-300 hover:border-emerald-400 hover:bg-emerald-50 motion-reduce:transform-none"
                    >
                        Explore features
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                    <div className="group rounded-2xl border border-emerald-100 bg-linear-to-br from-emerald-50/60 to-lime-50/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md motion-reduce:transform-none">
                        <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600/70">
                            Trades
                        </p>
                        <p className="mt-2 text-3xl font-bold bg-linear-to-r from-emerald-900 to-green-900 bg-clip-text text-transparent">
                            10K+
                        </p>
                        <p className="mt-1 text-xs text-green-700/70 font-medium">
                            Trades Logged
                        </p>
                    </div>
                    <div className="group rounded-2xl border border-amber-100 bg-linear-to-br from-amber-50/60 to-yellow-50/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-md motion-reduce:transform-none">
                        <p className="text-xs font-semibold uppercase tracking-widest text-amber-600/70">
                            Finance
                        </p>
                        <p className="mt-2 text-3xl font-bold bg-linear-to-r from-amber-700 to-amber-900 bg-clip-text text-transparent">
                            Live
                        </p>
                        <p className="mt-1 text-xs text-amber-700/70 font-medium">
                            Cashflow View
                        </p>
                    </div>
                    <div className="group rounded-2xl border border-lime-100 bg-linear-to-br from-lime-50/60 to-green-50/40 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-lime-200 hover:shadow-md motion-reduce:transform-none">
                        <p className="text-xs font-semibold uppercase tracking-widest text-lime-600/70">
                            Insights
                        </p>
                        <p className="mt-2 text-3xl font-bold bg-linear-to-r from-lime-700 to-green-800 bg-clip-text text-transparent">
                            Instant
                        </p>
                        <p className="mt-1 text-xs text-green-700/70 font-medium">
                            P/L Tracking
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative animate-fade-up [animation-delay:120ms]">
                <div className="absolute -left-8 top-12 h-40 w-40 rounded-full bg-emerald-300/20 blur-3xl animate-soft-glow" />
                <div className="absolute -right-6 -bottom-6 h-48 w-48 rounded-full bg-amber-300/15 blur-3xl animate-soft-glow [animation-delay:1.5s]" />

                <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-linear-to-br from-white/60 via-emerald-50/20 to-white/40 p-8 shadow-[0_20px_80px_rgba(5,150,105,0.08)] backdrop-blur-xl sm:p-10">
                    <div className="absolute inset-0 bg-linear-to-br from-emerald-50/30 via-transparent to-amber-50/20 rounded-3xl" />

                    <div className="relative space-y-8">
                        {/* Header with Icon */}
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-emerald-600 to-green-700 shadow-lg shadow-emerald-600/30">
                                <svg
                                    className="h-7 w-7 text-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-700/60">
                                    Mandi-Pro Dashboard
                                </p>
                                <h3 className="mt-1 text-lg font-bold text-emerald-950">
                                    Trading Overview
                                </h3>
                            </div>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid gap-5 sm:grid-cols-2">
                            {/* Left Stats Column */}
                            <div className="space-y-4">
                                <div className="rounded-2xl border border-emerald-100/50 bg-linear-to-br from-emerald-50/80 to-white/60 p-4 backdrop-blur-sm transition-all duration-300 hover:border-emerald-200/80">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700/70">
                                        Open Trades
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-emerald-950">
                                        248
                                    </p>
                                    <p className="mt-1 text-xs text-green-700/60 font-medium">
                                        Buy/Sell Entries
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-amber-100/50 bg-linear-to-br from-amber-50/80 to-white/60 p-4 backdrop-blur-sm transition-all duration-300 hover:border-amber-200/80">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-700/70">
                                        Net Position
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-amber-950">
                                        +12.4%
                                    </p>
                                    <p className="mt-1 text-xs text-amber-700/60 font-medium">
                                        Daily Margin
                                    </p>
                                </div>
                            </div>

                            {/* Right Content Column */}
                            <div className="space-y-4">
                                <div className="rounded-2xl border border-emerald-100/50 bg-linear-to-br from-white/80 to-emerald-50/40 p-4 backdrop-blur-sm">
                                    <div className="flex items-center justify-between">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700/70">
                                            Active Parties
                                        </p>
                                        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                    </div>
                                    <p className="mt-2 text-2xl font-bold text-emerald-950">
                                        1,247
                                    </p>
                                    <p className="mt-1 text-xs text-green-700/60 font-medium">
                                        Buyers & Sellers
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-lime-100/50 bg-linear-to-br from-lime-50/80 to-white/60 p-4 backdrop-blur-sm transition-all duration-300 hover:border-lime-200/80">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-lime-700/70">
                                        Expense Control
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-lime-900">
                                        42%
                                    </p>
                                    <p className="mt-1 text-xs text-green-700/60 font-medium">
                                        Reconciliation Time Saved
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Action Bar */}
                        <div className="rounded-2xl border border-white/40 bg-linear-to-r from-white/60 to-emerald-50/40 p-4 backdrop-blur-sm">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700/60">
                                        Last Sync
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-emerald-950">
                                        Trade books updated 2 minutes ago
                                    </p>
                                </div>
                                <div className="flex h-2 w-16 gap-1 rounded-full overflow-hidden bg-emerald-100/30">
                                    <div className="h-full flex-1 bg-emerald-500 rounded-full" />
                                    <div className="h-full flex-1 bg-emerald-400 rounded-full" />
                                    <div className="h-full flex-1 bg-emerald-300 rounded-full opacity-50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
