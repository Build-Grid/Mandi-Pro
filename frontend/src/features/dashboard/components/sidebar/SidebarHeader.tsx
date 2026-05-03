import { ChevronLeft, ChevronRight, Boxes } from "lucide-react";
import type { Firm } from "@/common/types";

type Props = {
    firm: Firm;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;
};

export default function SidebarHeader({
    firm,
    sidebarCollapsed,
    setSidebarCollapsed,
}: Props) {
    return !sidebarCollapsed ? (
        <div className="mb-4 flex w-full items-center justify-between rounded-[1.25rem] border border-stone-200 bg-stone-50 px-3 py-2">
            <div className="flex items-center gap-2 overflow-hidden">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-700 text-white shadow-sm">
                    <Boxes className="h-5 w-5" />
                </div>
                <div>
                    <p className="text-sm font-semibold truncate">
                        {firm.name}
                    </p>
                    <p className="text-xs text-stone-500">{firm.planType}</p>
                </div>
            </div>

            <button
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-stone-500 transition hover:bg-stone-200"
                aria-label="Collapse sidebar"
                onClick={() => setSidebarCollapsed(true)}
            >
                <ChevronLeft className="h-4 w-4" />
            </button>
        </div>
    ) : (
        <div className="mb-4 flex w-full justify-center">
            <button
                className="grid h-12 w-12 place-items-center rounded-xl text-stone-500 transition hover:bg-stone-100"
                aria-label="Expand sidebar"
                title="Expand sidebar"
                onClick={() => setSidebarCollapsed(false)}
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    );
}
