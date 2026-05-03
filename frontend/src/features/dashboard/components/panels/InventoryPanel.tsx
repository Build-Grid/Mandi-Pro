"use client";

export function InventoryPanel() {
    return (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-7">
            <section className="rounded-lg sm:rounded-xl md:rounded-[1.5rem] lg:rounded-[1.75rem] border border-stone-200/70 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.05)] lg:col-span-5">
                <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                    Stock movement
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-stone-500">
                    Track flow, reorder points, and stock pressure across
                    commodities.
                </p>
            </section>
            <section className="rounded-lg sm:rounded-xl md:rounded-[1.5rem] lg:rounded-[1.75rem] border border-stone-200/70 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.05)] lg:col-span-2">
                <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                    Alerts
                </h3>
                <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-stone-700">
                    <div className="rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2 sm:p-3">
                        Wheat below reorder threshold
                    </div>
                    <div className="rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2 sm:p-3">
                        Soybean stock healthy
                    </div>
                </div>
            </section>
        </div>
    );
}
