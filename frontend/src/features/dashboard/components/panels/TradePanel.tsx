"use client";

import type { DashboardData } from "../../types";

export function TradePanel({ recent }: { recent: DashboardData["recent"] }) {
    return (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:col-span-1 lg:grid-cols-7">
            <section className="rounded-lg sm:rounded-xl md:rounded-[1.5rem] lg:rounded-[1.75rem] border border-stone-200/70 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.05)] lg:col-span-4">
                <header className="mb-3 sm:mb-4 flex items-start justify-between gap-2 sm:gap-3">
                    <div>
                        <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-emerald-700">
                            Trade
                        </p>
                        <h3 className="mt-1 sm:mt-2 text-sm sm:text-lg font-semibold text-stone-900">
                            Create trade entry
                        </h3>
                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-stone-500">
                            Record a sale, purchase, or settlement in one pass.
                        </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-stone-200 bg-stone-50 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-stone-500">
                        Live
                    </span>
                </header>

                <div className="grid grid-cols-1 gap-2 sm:gap-3 sm:grid-cols-2">
                    {[
                        "Client",
                        "Commodity",
                        "Quantity / Bags",
                        "Rate / Bag",
                    ].map((label) => (
                        <label
                            key={label}
                            className="space-y-1 sm:space-y-2 text-xs sm:text-sm"
                        >
                            <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-stone-500">
                                {label}
                            </span>
                            <input className="w-full rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 px-2.5 sm:px-3 py-2 sm:py-3 text-sm outline-none focus:border-emerald-700" />
                        </label>
                    ))}
                    <label className="space-y-1 sm:space-y-2 text-xs sm:text-sm sm:col-span-2">
                        <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wide text-stone-500">
                            Notes
                        </span>
                        <textarea className="min-h-20 sm:min-h-28 w-full rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 px-2.5 sm:px-3 py-2 sm:py-3 text-sm outline-none focus:border-emerald-700" />
                    </label>
                </div>

                <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                    <button className="rounded-lg sm:rounded-2xl bg-emerald-700 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white shadow-sm transition hover:bg-emerald-800">
                        Save entry
                    </button>
                    <button className="rounded-lg sm:rounded-2xl border border-stone-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-stone-700 transition hover:bg-stone-50">
                        Add claim
                    </button>
                    <button className="rounded-lg sm:rounded-2xl border border-stone-200 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-stone-700 transition hover:bg-stone-50">
                        Create invoice
                    </button>
                </div>
            </section>

            <section className="rounded-lg sm:rounded-xl md:rounded-[1.5rem] lg:rounded-[1.75rem] border border-stone-200/70 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.05)] lg:col-span-3">
                <header className="mb-3 sm:mb-4">
                    <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                        Today's trade flow
                    </h3>
                    <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-stone-500">
                        Quick view of the latest settlements and pending work.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {[
                        ["Open deals", "12", "+3"],
                        ["Settled today", "8", "+2"],
                        ["Pending claims", "4", "-1"],
                    ].map(([label, value, delta]) => (
                        <div
                            key={label}
                            className="rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2 sm:p-3"
                        >
                            <p className="text-[10px] sm:text-xs text-stone-500">
                                {label}
                            </p>
                            <div className="mt-1.5 sm:mt-2 flex items-end justify-between">
                                <p className="text-xl sm:text-2xl font-semibold text-stone-900">
                                    {value}
                                </p>
                                <span className="text-[10px] sm:text-xs text-emerald-700">
                                    {delta}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-3 sm:mt-4 rounded-lg sm:rounded-2xl border border-stone-200 bg-gradient-to-br from-emerald-50 to-amber-50 p-3 sm:p-4">
                    <p className="text-xs sm:text-sm font-medium text-stone-900">
                        Suggestion
                    </p>
                    <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-stone-600">
                        Add a settlement for Bharat Agro and link the invoice.
                    </p>
                </div>

                <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                    {recent.slice(0, 3).map((transaction) => (
                        <div
                            key={transaction.id}
                            className="flex items-center justify-between rounded-lg sm:rounded-2xl border border-stone-200 px-2 sm:px-3 py-2 sm:py-3"
                        >
                            <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-stone-900 truncate">
                                    {transaction.client}
                                </p>
                                <p className="text-[10px] sm:text-xs text-stone-500 truncate">
                                    {transaction.commodity}
                                </p>
                            </div>
                            <p className="text-xs sm:text-sm font-medium text-stone-900 shrink-0 ml-2">
                                {transaction.amount}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
