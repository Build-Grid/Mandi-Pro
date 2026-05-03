"use client";

import { useState } from "react";
import { type DashboardWidgetId } from "../../constants";
import { getWidgetClass } from "../../constants";
import type { DashboardData } from "../../types";

function classNames(...values: Array<string | false | null | undefined>) {
    return values.filter(Boolean).join(" ");
}

type DashboardWidget = {
    id: DashboardWidgetId;
    title: string;
    description: string;
};

const WIDGETS: DashboardWidget[] = [
    {
        id: "kpis",
        title: "Business KPIs",
        description: "Real-time mandi performance",
    },
    {
        id: "trend",
        title: "Revenue Trend",
        description: "Weekly collections vs payouts",
    },
    {
        id: "transactions",
        title: "Recent Transactions",
        description: "Latest client settlements",
    },
    {
        id: "inventory",
        title: "Inventory Snapshot",
        description: "Stock levels across commodities",
    },
];

export function OverviewWidgets({
    metrics,
    recent,
    inventory,
    widgetOrder,
    setWidgetOrder,
}: {
    metrics: DashboardData["metrics"];
    recent: DashboardData["recent"];
    inventory: DashboardData["inventory"];
    widgetOrder: DashboardWidgetId[];
    setWidgetOrder: (order: DashboardWidgetId[]) => void;
}) {
    const [draggingWidgetId, setDraggingWidgetId] =
        useState<DashboardWidgetId | null>(null);

    const orderedWidgets = widgetOrder
        .map((widgetId) => WIDGETS.find((widget) => widget.id === widgetId))
        .filter((widget): widget is DashboardWidget => Boolean(widget));

    const moveWidget = (
        sourceId: DashboardWidgetId,
        targetId: DashboardWidgetId,
    ) => {
        if (sourceId === targetId) return;

        const nextOrder = [...widgetOrder];
        const sourceIndex = nextOrder.indexOf(sourceId);
        const targetIndex = nextOrder.indexOf(targetId);

        if (sourceIndex < 0 || targetIndex < 0) return;

        nextOrder.splice(sourceIndex, 1);
        nextOrder.splice(targetIndex, 0, sourceId);

        setWidgetOrder(nextOrder);
    };

    return (
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
            {orderedWidgets.map((widget) => {
                const isDragging = draggingWidgetId === widget.id;

                return (
                    <section
                        key={widget.id}
                        draggable
                        onDragStart={() => setDraggingWidgetId(widget.id)}
                        onDragEnd={() => setDraggingWidgetId(null)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => {
                            if (draggingWidgetId) {
                                moveWidget(draggingWidgetId, widget.id);
                            }
                            setDraggingWidgetId(null);
                        }}
                        className={classNames(
                            "rounded-lg sm:rounded-xl md:rounded-[1.5rem] lg:rounded-[1.75rem] border border-stone-200/70 bg-white p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.05)] transition",
                            isDragging && "scale-[0.99] opacity-70",
                            getWidgetClass(widget.id),
                        )}
                    >
                        <header className="mb-3 sm:mb-4 flex items-start justify-between gap-2 sm:gap-3">
                            <div className="min-w-0">
                                <h3 className="text-xs sm:text-sm font-semibold text-stone-900">
                                    {widget.title}
                                </h3>
                                <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-stone-500 line-clamp-1">
                                    {widget.description}
                                </p>
                            </div>
                            <span className="shrink-0 rounded-full border border-stone-200 bg-stone-50 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-medium text-stone-500">
                                Drag
                            </span>
                        </header>

                        {widget.id === "kpis" && (
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                {metrics.map((metric) => (
                                    <div
                                        key={metric.id}
                                        className="rounded-lg sm:rounded-2xl border border-stone-200 bg-gradient-to-br from-stone-50 to-white p-2.5 sm:p-3"
                                    >
                                        <p className="text-[10px] sm:text-xs text-stone-500">
                                            {metric.label}
                                        </p>
                                        <p className="mt-2 text-lg sm:text-2xl font-semibold text-stone-900">
                                            {metric.value}
                                        </p>
                                        <p className="mt-1 text-[10px] sm:text-xs text-emerald-700">
                                            {metric.delta}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {widget.id === "trend" && (
                            <div className="space-y-3">
                                <div className="rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2.5 sm:p-3">
                                    <div className="flex items-end gap-1.5 sm:gap-2">
                                        {[36, 52, 48, 64, 58, 74, 69].map(
                                            (height, index) => (
                                                <div
                                                    key={index}
                                                    className="flex-1"
                                                >
                                                    <div
                                                        className="rounded-t-lg sm:rounded-t-2xl bg-gradient-to-t from-emerald-700 to-emerald-500"
                                                        style={{
                                                            height: `${height * 0.6}px`,
                                                        }}
                                                    />
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                                <p className="text-[10px] sm:text-xs text-stone-500">
                                    Peak collection Friday with higher soybean
                                    and maize settlements.
                                </p>
                            </div>
                        )}

                        {widget.id === "transactions" && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-left text-xs sm:text-sm">
                                    <thead className="text-[10px] sm:text-xs text-stone-500">
                                        <tr>
                                            <th className="pb-2">Client</th>
                                            <th className="pb-2">Commodity</th>
                                            <th className="pb-2">Amount</th>
                                            <th className="pb-2">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-stone-700">
                                        {recent.map((transaction) => (
                                            <tr
                                                key={transaction.id}
                                                className="border-t border-stone-200"
                                            >
                                                <td className="py-2 sm:py-3 truncate">
                                                    {transaction.client}
                                                </td>
                                                <td className="truncate">
                                                    {transaction.commodity}
                                                </td>
                                                <td>{transaction.amount}</td>
                                                <td>
                                                    <span className="rounded-full bg-stone-100 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs">
                                                        {transaction.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {widget.id === "inventory" && (
                            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                                {inventory.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between rounded-lg sm:rounded-2xl border border-stone-200 bg-stone-50 p-2 sm:p-3"
                                    >
                                        <div>
                                            <p className="text-xs sm:text-sm font-medium text-stone-900">
                                                {item.name}
                                            </p>
                                            <p className="text-[10px] sm:text-xs text-stone-500">
                                                In stock: {item.quantity}
                                            </p>
                                        </div>
                                        <span className="text-[10px] sm:text-xs text-emerald-700 shrink-0">
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                );
            })}
        </div>
    );
}
