"use client";

import { getSidebarSelection, type NavSection } from "../constants";
import type { Firm } from "@/common/types";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarSearch from "./sidebar/SidebarSearch";
import SidebarNavigation from "./sidebar/SidebarNavigation";
import SidebarFooter from "./sidebar/SidebarFooter";

type Props = {
    firm: Firm;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;
    sidebarSearch: string;
    setSidebarSearch: (search: string) => void;
    activeNavId: string;
    setActiveNavId: (id: string) => void;
    sidebarGroups: NavSection[];
};

export default function Sidebar({
    firm,
    sidebarCollapsed,
    setSidebarCollapsed,
    sidebarSearch,
    setSidebarSearch,
    activeNavId,
    setActiveNavId,
    sidebarGroups,
}: Props) {
    const activeNode = getSidebarSelection(activeNavId);
    return (
        <aside
            className={
                sidebarCollapsed
                    ? "flex shrink-0 flex-col border-r border-stone-200/80 bg-white/94 p-3 backdrop-blur-md transition-all duration-300 h-screen overflow-hidden w-20 items-center"
                    : "flex shrink-0 flex-col border-r border-stone-200/80 bg-white/94 p-3 backdrop-blur-md transition-all duration-300 h-screen overflow-hidden w-80"
            }
        >
            <SidebarHeader
                firm={firm}
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={setSidebarCollapsed}
            />

            <SidebarSearch
                sidebarCollapsed={sidebarCollapsed}
                sidebarSearch={sidebarSearch}
                setSidebarSearch={setSidebarSearch}
            />

            <SidebarNavigation
                sidebarCollapsed={sidebarCollapsed}
                sidebarGroups={sidebarGroups}
                activeNavId={activeNavId}
                setActiveNavId={setActiveNavId}
            />

            <SidebarFooter
                sidebarCollapsed={sidebarCollapsed}
                activeCrumbs={activeNode.crumbs}
            />
        </aside>
    );
}
