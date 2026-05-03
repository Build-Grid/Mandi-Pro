"use client";

import { useEffect, useMemo } from "react";
import { Command, Sparkles } from "lucide-react";
import { getSidebarSelection } from "../constants";
import { useDashboardStore } from "../store";
import {
    useDashboardData,
    useDashboardSidebarGroups,
    useQuickActions,
} from "../hooks";
import Sidebar from "./Sidebar";
import Topbar from "./topbar/Topbar";
import {
    OverviewWidgets,
    TradePanel,
    CommodityPanel,
    LedgerPanel,
    ReportsPanel,
    AdminPanel,
    type AdminPanelMode,
    InventoryPanel,
    MarketplacePanel,
} from "./Panels";
import { useLogout } from "@/features/auth/hooks";
import type { Firm, User } from "@/common/types";

function classNames(...values: Array<string | false | null | undefined>) {
    return values.filter(Boolean).join(" ");
}

export default function DashboardLayout({
    user,
    firm,
}: {
    user: User;
    firm: Firm;
}) {
    const { data, isLoading } = useDashboardData();
    const { mutate: triggerLogout, isPending: isLoggingOut } = useLogout();

    // UI State from Zustand
    const {
        sidebarCollapsed,
        setSidebarCollapsed,
        sidebarSearch,
        setSidebarSearch,
        actionSearch,
        setActionSearch,
        paletteSearch,
        setPaletteSearch,
        activeNavId,
        setActiveNavId,
        showPalette,
        setShowPalette,
        showUserMenu,
        setShowUserMenu,
        widgetOrder,
        setWidgetOrder,
    } = useDashboardStore();

    const activeNode = useMemo(
        () => getSidebarSelection(activeNavId),
        [activeNavId],
    );

    const adminPanelMode = useMemo<AdminPanelMode>(() => {
        if (activeNavId === "admin-users") {
            return "users";
        }

        if (activeNavId === "admin-firm") {
            return "firm";
        }

        return "all";
    }, [activeNavId]);

    const sidebarGroups = useDashboardSidebarGroups({
        sidebarSearch,
        user,
    });

    // Quick actions
    const { actionResults, paletteResults } = useQuickActions({
        actionSearch,
        paletteSearch,
        setActiveNavId,
        setSidebarCollapsed,
        setWidgetOrder,
        sidebarCollapsed,
        user,
    });

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                (event.metaKey || event.ctrlKey) &&
                event.key.toLowerCase() === "k"
            ) {
                event.preventDefault();
                setShowPalette(true);
            }

            if (event.key === "Escape") {
                setShowPalette(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [setShowPalette]);

    // Auto-focus palette search
    useEffect(() => {
        if (!showPalette) return;

        setTimeout(() => {
            document
                .querySelector<HTMLInputElement>(
                    'input[placeholder="Search quick actions..."]',
                )
                ?.focus();
        }, 0);
    }, [showPalette]);

    return (
        <div className="flex h-screen overflow-hidden bg-stone-100 text-stone-900">
            {/* Sidebar Drawer Overlay (Mobile) */}
            {sidebarCollapsed ? null : (
                <div
                    className="fixed inset-0 z-30 bg-stone-950/40 md:hidden"
                    onClick={() => setSidebarCollapsed(true)}
                />
            )}

            <div className="flex w-full bg-[radial-gradient(circle_at_top_left,rgba(22,163,74,0.12),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(180,83,9,0.10),transparent_38%)]">
                {/* Sidebar - Desktop */}
                <div className="hidden md:flex">
                    <Sidebar
                        firm={firm}
                        sidebarCollapsed={sidebarCollapsed}
                        setSidebarCollapsed={setSidebarCollapsed}
                        sidebarSearch={sidebarSearch}
                        setSidebarSearch={setSidebarSearch}
                        activeNavId={activeNavId}
                        setActiveNavId={setActiveNavId}
                        sidebarGroups={sidebarGroups}
                    />
                </div>

                {/* Sidebar - Mobile Drawer */}
                <div
                    className={classNames(
                        "fixed inset-y-0 left-0 z-40 w-80 transition-transform duration-300 md:hidden",
                        sidebarCollapsed
                            ? "-translate-x-full"
                            : "translate-x-0",
                    )}
                >
                    <Sidebar
                        firm={firm}
                        sidebarCollapsed={sidebarCollapsed}
                        setSidebarCollapsed={setSidebarCollapsed}
                        sidebarSearch={sidebarSearch}
                        setSidebarSearch={setSidebarSearch}
                        activeNavId={activeNavId}
                        setActiveNavId={setActiveNavId}
                        sidebarGroups={sidebarGroups}
                    />
                </div>

                {/* Main content area */}
                <div className="flex flex-1 flex-col overflow-hidden">
                    {/* Topbar */}
                    <Topbar
                        activeNode={activeNode}
                        actionSearch={actionSearch}
                        setActionSearch={setActionSearch}
                        actionResults={actionResults}
                        showPalette={showPalette}
                        setShowPalette={setShowPalette}
                        showUserMenu={showUserMenu}
                        setShowUserMenu={setShowUserMenu}
                        sidebarCollapsed={sidebarCollapsed}
                        setSidebarCollapsed={setSidebarCollapsed}
                        onLogout={triggerLogout}
                        isLoggingOut={isLoggingOut}
                        setActiveNavId={setActiveNavId}
                        user={user}
                    />

                    {/* Main scrollable content */}
                    <main className="flex-1 overflow-y-auto px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-6">
                        <div className="mb-3 sm:mb-4 rounded-lg sm:rounded-xl md:rounded-3xl border border-stone-200/80 bg-white/88 p-3 sm:p-4 shadow-[0_12px_30px_rgba(41,37,36,0.06)]">
                            <div className="flex items-center justify-between gap-2 sm:gap-4">
                                <div>
                                    <p className="text-xs sm:text-sm font-medium text-stone-800">
                                        Personalized workspace
                                    </p>
                                    <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-stone-500">
                                        Search modules from the sidebar, search
                                        actions from the header, or use the
                                        quick command palette.
                                    </p>
                                </div>
                                <Sparkles className="h-4 sm:h-5 w-4 sm:w-5 shrink-0 text-amber-700" />
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="grid gap-3 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
                                <div className="h-48 sm:h-72 rounded-lg sm:rounded-[1.75rem] border border-stone-200 bg-white/80 md:col-span-2 lg:col-span-2 xl:col-span-3" />
                                <div className="h-48 sm:h-72 rounded-lg sm:rounded-[1.75rem] border border-stone-200 bg-white/80 md:col-span-2 lg:col-span-3 xl:col-span-4" />
                            </div>
                        ) : null}

                        {!isLoading &&
                        activeNode.parentLabel === "Dashboard" &&
                        data ? (
                            <OverviewWidgets
                                metrics={data.metrics}
                                recent={data.recent}
                                inventory={data.inventory}
                                widgetOrder={widgetOrder}
                                setWidgetOrder={setWidgetOrder}
                            />
                        ) : null}

                        {!isLoading &&
                        activeNode.parentLabel === "Trade" &&
                        data ? (
                            <TradePanel recent={data.recent} />
                        ) : null}

                        {!isLoading &&
                        activeNode.parentLabel === "Commodity" &&
                        data ? (
                            <CommodityPanel inventory={data.inventory} />
                        ) : null}

                        {!isLoading &&
                        activeNode.parentLabel === "Inventory" ? (
                            <InventoryPanel />
                        ) : null}

                        {!isLoading && activeNode.parentLabel === "Ledger" ? (
                            <LedgerPanel />
                        ) : null}

                        {!isLoading && activeNode.parentLabel === "Reports" ? (
                            <ReportsPanel />
                        ) : null}

                        {!isLoading && activeNode.parentLabel === "Settings" ? (
                            <AdminPanel
                                user={user}
                                firm={firm}
                                mode={adminPanelMode}
                            />
                        ) : null}

                        {!isLoading &&
                        activeNode.parentLabel === "Marketplace" ? (
                            <MarketplacePanel />
                        ) : null}
                    </main>
                </div>
            </div>

            {/* Command Palette Modal */}
            {showPalette ? (
                <div
                    className="fixed inset-0 z-40 bg-stone-950/35 p-3 sm:p-4 backdrop-blur-[2px]"
                    onClick={() => setShowPalette(false)}
                >
                    <div
                        className="mx-auto mt-10 sm:mt-20 max-w-2xl rounded-lg sm:rounded-[1.75rem] border border-stone-200 bg-white p-2 sm:p-3 shadow-[0_24px_60px_rgba(41,37,36,0.18)]"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="mb-2 sm:mb-3 flex items-center gap-2 rounded-lg sm:rounded-2xl border border-stone-200 px-2 sm:px-3 py-2 sm:py-2.5">
                            <Command className="h-4 w-4 text-stone-500 shrink-0" />
                            <input
                                value={paletteSearch}
                                onChange={(event) =>
                                    setPaletteSearch(event.target.value)
                                }
                                onKeyDown={(event) => {
                                    if (event.key !== "Enter") {
                                        return;
                                    }

                                    const firstAction = paletteResults[0];

                                    if (firstAction) {
                                        firstAction.run();
                                        setShowPalette(false);
                                    }
                                }}
                                placeholder="Search quick actions..."
                                className="w-full bg-transparent text-sm outline-none"
                                autoFocus
                            />
                        </div>

                        <div className="space-y-1 sm:space-y-2">
                            {paletteResults.length > 0 ? (
                                paletteResults.map((action) => {
                                    const ActionIcon = action.icon;

                                    return (
                                        <button
                                            key={action.id}
                                            onClick={() => {
                                                action.run();
                                                setShowPalette(false);
                                            }}
                                            className="flex w-full items-start justify-between rounded-lg sm:rounded-2xl border border-stone-200 px-2 sm:px-3 py-2 sm:py-3 text-left text-sm transition hover:bg-stone-50"
                                        >
                                            <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                                                <div className="grid h-8 sm:h-10 w-8 sm:w-10 shrink-0 place-items-center rounded-lg sm:rounded-2xl bg-emerald-50 text-emerald-700">
                                                    <ActionIcon className="h-4 w-4" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs sm:text-sm font-medium text-stone-900">
                                                        {action.label}
                                                    </p>
                                                    <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-stone-500 line-clamp-1">
                                                        {action.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })
                            ) : (
                                <p className="px-1 py-3 sm:py-4 text-xs sm:text-sm text-stone-500 text-center">
                                    No quick actions match your search.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
