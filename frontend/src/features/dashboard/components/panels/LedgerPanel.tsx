"use client";

export function LedgerPanel() {
    return (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-7">
            <section className="rounded-lg sm:rounded-xl md:rounded-[1.5rem] lg:rounded-[1.75rem] border border-stone-200/70 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.05)] lg:col-span-4">
                <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                    Ledger summary
                </h3>
                <div className="mt-3 sm:mt-4 grid gap-2 sm:gap-3 sm:grid-cols-3">
                    {[
                        ["Receivables", "Rs 4.2L"],
                        ["Payables", "Rs 1.7L"],
                        ["Claims", "Rs 62K"],
                    ].map(([label, value]) => (
                        <div
                            key={label}
                            className="rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2 sm:p-3"
                        >
                            <p className="text-[10px] sm:text-xs text-stone-500">
                                {label}
                            </p>
                            <p className="mt-1.5 sm:mt-2 text-lg sm:text-xl font-semibold text-stone-900">
                                {value}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-lg sm:rounded-xl md:rounded-[1.5rem] lg:rounded-[1.75rem] border border-stone-200/70 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.05)] lg:col-span-3">
                <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                    Claims register
                </h3>
                <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-xs sm:text-sm text-stone-700">
                    {[
                        "Broker commission adjustment",
                        "Transport deduction",
                        "Moisture discount",
                    ].map((entry) => (
                        <div
                            key={entry}
                            className="rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2 sm:p-3"
                        >
                            {entry}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
