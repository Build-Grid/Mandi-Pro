"use client";

export function ReportsPanel() {
    return (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-7">
            <section className="rounded-lg sm:rounded-xl md:rounded-[1.5rem] lg:rounded-[1.75rem] border border-stone-200/70 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.05)] lg:col-span-5">
                <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                    Profit and loss
                </h3>
                <div className="mt-3 sm:mt-4 rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2 sm:p-3">
                    <div className="flex items-end gap-1.5 sm:gap-2">
                        {[28, 42, 36, 58, 46, 70, 64].map((height, index) => (
                            <div key={index} className="flex-1">
                                <div
                                    className="rounded-t-lg sm:rounded-t-2xl bg-gradient-to-t from-amber-700 to-emerald-700"
                                    style={{ height: `${height * 0.8}px` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="rounded-lg sm:rounded-xl md:rounded-[1.5rem] lg:rounded-[1.75rem] border border-stone-200/70 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.05)] lg:col-span-2">
                <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                    Report shortcuts
                </h3>
                <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-stone-700">
                    <div className="rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2 sm:p-3">
                        Export monthly PDF
                    </div>
                    <div className="rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2 sm:p-3">
                        Compare branches
                    </div>
                    <div className="rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2 sm:p-3">
                        Commodity mix
                    </div>
                </div>
            </section>
        </div>
    );
}
