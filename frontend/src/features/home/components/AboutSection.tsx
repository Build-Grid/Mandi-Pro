export function AboutSection() {
    return (
        <section
            id="about"
            className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
        >
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                <div className="rounded-2xl border border-amber-200 bg-linear-to-br from-emerald-900 via-emerald-800 to-green-900 p-8 text-white shadow-2xl shadow-emerald-900/20">
                    <div className="space-y-4">
                        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-amber-300">
                            About Mandi Pro
                        </p>
                        <h2 className="mt-4 text-3xl font-bold tracking-tight">
                            Built for mandi-first trading operations
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-emerald-100">
                            Mandi-Pro helps traders who purchase from farmers,
                            process and package goods, and sell to third parties
                            with full visibility into trade performance.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <article className="rounded-2xl border border-emerald-200 bg-linear-to-br from-emerald-50 to-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-200 motion-reduce:transform-none">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                            Mission
                        </p>
                        <p className="mt-3 text-sm leading-7 text-emerald-900">
                            Digitize mandi workflows end-to-end so traders can
                            operate faster with better control and fewer manual
                            errors.
                        </p>
                    </article>
                    <article className="rounded-2xl border border-emerald-200 bg-linear-to-br from-amber-50 to-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-200 motion-reduce:transform-none">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                            Impact
                        </p>
                        <p className="mt-3 text-sm leading-7 text-emerald-900">
                            Instant visibility into trades, cashflow, ledgers,
                            claims, and expenses improves daily margin
                            decisions.
                        </p>
                    </article>
                    <article className="rounded-2xl border border-emerald-200 bg-linear-to-br from-lime-50 to-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-amber-200 motion-reduce:transform-none sm:col-span-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                            Our Promise
                        </p>
                        <p className="mt-3 text-sm leading-7 text-emerald-900">
                            One trusted platform for trade tracking, financial
                            management, and reliable profit and loss insights
                            for every mandi business.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
}
