"use client";

import type { DashboardData } from "../../types";

export function CommodityPanel({
    inventory,
}: {
    inventory: DashboardData["inventory"];
}) {
    return (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-7">
            <section className="rounded-lg sm:rounded-xl md:rounded-[1.5rem] lg:rounded-[1.75rem] border border-stone-200/70 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.05)] lg:col-span-4">
                <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                    Commodity catalog
                </h3>
                <div className="mt-3 sm:mt-4 grid gap-2 sm:gap-3 sm:grid-cols-2">
                    {inventory.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2 sm:p-3"
                        >
                            <p className="text-xs sm:text-sm font-medium text-stone-900">
                                {item.name}
                            </p>
                            <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-stone-500">
                                In stock: {item.quantity}
                            </p>
                            <p className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-emerald-700">
                                {item.status}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="rounded-lg sm:rounded-xl md:rounded-[1.5rem] lg:rounded-[1.75rem] border border-stone-200/70 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.05)] lg:col-span-3">
                <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                    Add commodity
                </h3>
                <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                    <input
                        className="w-full rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 px-2.5 sm:px-3 py-2 sm:py-3 text-sm outline-none focus:border-emerald-700"
                        placeholder="Commodity name"
                    />
                    <input
                        className="w-full rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 px-2.5 sm:px-3 py-2 sm:py-3 text-sm outline-none focus:border-emerald-700"
                        placeholder="Category"
                    />
                    <button className="w-full rounded-lg sm:rounded-2xl bg-emerald-700 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-white hover:bg-emerald-800">
                        Save commodity
                    </button>
                </div>
            </section>
        </div>
    );
}
