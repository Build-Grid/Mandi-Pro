import Link from "next/link";

export function CtaSection() {
    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-linear-to-r from-emerald-900 to-green-800 px-6 py-10 text-white shadow-2xl shadow-emerald-900/30 transition duration-300 hover:-translate-y-1 sm:px-10 sm:py-14 motion-reduce:transform-none border border-amber-200/30">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">
                            Join Mandi Pro
                        </p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                            Digitize your mandi trading operations today
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-7 text-emerald-100 sm:text-base">
                            Track buys, sales, ledgers, expenses, claims, and
                            profit/loss in one system designed for mandi-based
                            businesses.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3 lg:justify-end">
                        <Link
                            href="/register"
                            className="rounded-full bg-linear-to-r from-amber-400 to-amber-500 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-amber-400/30 transition duration-300 hover:-translate-y-0.5 hover:from-amber-500 hover:to-amber-600 motion-reduce:transform-none"
                        >
                            Get started
                        </Link>
                        <Link
                            href="/login"
                            className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-white/20 motion-reduce:transform-none"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
