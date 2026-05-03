"use client";

export function MarketplacePanel() {
    return (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-7">
            <section className="rounded-lg sm:rounded-xl md:rounded-3xl lg:rounded-[1.75rem] border border-stone-200/70 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.05)] lg:col-span-5">
                <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                    Pricing board
                </h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-stone-500">
                    Compare live commodity pricing across branches and
                    districts.
                </p>
            </section>
            <section className="rounded-lg sm:rounded-xl md:rounded-3xl lg:rounded-[1.75rem] border border-stone-200/70 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.05)] lg:col-span-2">
                <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                    Quick actions
                </h3>
                <div className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-stone-700">
                    <div className="rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2 sm:p-3">
                        Compare branch A
                    </div>
                    <div className="rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2 sm:p-3">
                        Compare branch B
                    </div>
                </div>
            </section>
        </div>
    );
}
