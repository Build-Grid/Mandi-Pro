"use client";

import { useEffect, useRef } from "react";
import { Bell, ChevronDown, Command, Search } from "lucide-react";
import type { SidebarSelection } from "../constants";
import type { QuickAction } from "../types";
import type { User } from "@/common/types";
import ProfilePanel from "./topbar/ProfilePanel";

type Props = {
    activeNode: SidebarSelection;
    actionSearch: string;
    setActionSearch: (search: string) => void;
    actionResults: QuickAction[];
    showPalette: boolean;
    setShowPalette: (show: boolean) => void;
    showUserMenu: boolean;
    setShowUserMenu: (show: boolean) => void;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;
    onLogout: () => void;
    isLoggingOut: boolean;
    setActiveNavId: (id: string) => void;
    user: User;
};

function classNames(...values: Array<string | false | null | undefined>) {
    return values.filter(Boolean).join(" ");
}

export default function Topbar({
    activeNode,
    actionSearch,
    setActionSearch,
    actionResults,
    setShowPalette,
    showUserMenu,
    setShowUserMenu,
    sidebarCollapsed,
    setSidebarCollapsed,
    onLogout,
    isLoggingOut,
    setActiveNavId,
    user,
}: Props) {
    const actionSearchRef = useRef<HTMLInputElement | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (!menuRef.current) return;
            if (menuRef.current.contains(event.target as Node)) return;
            setShowUserMenu(false);
        }

        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [setShowUserMenu]);

    return (
        <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-white/90 px-3 py-2 sm:px-4 sm:py-3 backdrop-blur-md">
            <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.22em] text-stone-400">
                        {activeNode.crumbs.map((crumb, index) => (
                            <span
                                key={crumb}
                                className={classNames(
                                    "rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1",
                                    index === activeNode.crumbs.length - 1
                                        ? "bg-emerald-50 text-emerald-800"
                                        : "bg-stone-100 text-stone-500",
                                )}
                            >
                                {crumb}
                            </span>
                        ))}
                    </div>
                    <div>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-stone-900">
                            {activeNode.label}
                        </h1>
                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-stone-500 line-clamp-1">
                            {activeNode.description}
                        </p>
                    </div>
                </div>

                <div className="flex w-full items-center gap-1.5 sm:gap-2 lg:max-w-3xl">
                    <div className="relative flex-1">
                        <input
                            ref={actionSearchRef}
                            value={actionSearch}
                            onChange={(event) =>
                                setActionSearch(event.target.value)
                            }
                            onKeyDown={(event) => {
                                if (event.key !== "Enter") return;

                                const firstAction = actionResults[0];

                                if (firstAction) {
                                    firstAction.run();
                                }
                            }}
                            placeholder="Search actions..."
                            className="w-full rounded-lg sm:rounded-[1.15rem] border border-stone-300 bg-white px-3 sm:px-4 py-2 sm:py-3 pr-9 sm:pr-10 text-sm outline-none transition focus:border-emerald-700"
                        />
                        <Search className="pointer-events-none absolute right-2 sm:right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />

                        {actionSearch.trim().length > 0 ? (
                            <div className="absolute right-0 top-[calc(100%+0.5rem)] sm:top-[calc(100%+0.6rem)] z-20 w-full overflow-hidden rounded-lg sm:rounded-[1.25rem] border border-stone-200 bg-white shadow-[0_20px_45px_rgba(41,37,36,0.12)]">
                                {actionResults.length > 0 ? (
                                    actionResults.slice(0, 5).map((action) => {
                                        const ActionIcon = action.icon;

                                        return (
                                            <button
                                                key={action.id}
                                                onClick={() => {
                                                    action.run();
                                                    setActionSearch("");
                                                }}
                                                className="flex w-full items-center gap-2 sm:gap-3 border-b border-stone-100 px-3 sm:px-4 py-2 sm:py-3 text-left text-sm transition last:border-b-0 hover:bg-stone-50"
                                            >
                                                <div className="grid h-8 sm:h-9 w-8 sm:w-9 shrink-0 place-items-center rounded-lg sm:rounded-2xl bg-emerald-50 text-emerald-700">
                                                    <ActionIcon className="h-4 w-4" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs sm:text-sm font-medium text-stone-900">
                                                        {action.label}
                                                    </p>
                                                    <p className="text-[10px] sm:text-xs text-stone-500 truncate">
                                                        {action.description}
                                                    </p>
                                                </div>
                                            </button>
                                        );
                                    })
                                ) : (
                                    <p className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-stone-500">
                                        No actions match this search.
                                    </p>
                                )}
                            </div>
                        ) : null}
                    </div>

                    <button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-lg sm:rounded-[1.15rem] border border-stone-300 bg-white text-stone-600 transition hover:bg-stone-100 md:hidden shrink-0"
                        aria-label="Toggle sidebar"
                    >
                        <ChevronDown className="h-4 w-4" />
                    </button>

                    <button
                        onClick={() => setShowPalette(true)}
                        title="Open quick actions (Ctrl+K)"
                        className="hidden sm:grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-lg sm:rounded-[1.15rem] border border-stone-300 bg-white text-stone-600 transition hover:bg-stone-100 shrink-0"
                        aria-label="Open quick actions"
                    >
                        <Command className="h-4 w-4" />
                    </button>

                    <button className="hidden sm:grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-lg sm:rounded-[1.15rem] border border-stone-300 bg-white text-stone-600 transition hover:bg-stone-100 shrink-0">
                        <Bell className="h-4 w-4" />
                    </button>

                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-1 sm:gap-2 rounded-lg sm:rounded-[1.15rem] border border-stone-300 bg-white px-1.5 sm:px-2 py-1 sm:py-1.5 text-xs sm:text-sm transition hover:bg-stone-100 shrink-0"
                        >
                            <div className="grid h-7 w-7 sm:h-8 sm:w-8 place-items-center rounded-md sm:rounded-xl bg-emerald-700 text-[10px] sm:text-xs font-semibold text-white">
                                {user.firstName
                                    ? user.firstName.charAt(0) +
                                      (user.lastName
                                          ? user.lastName.charAt(0)
                                          : "")
                                    : user.username.slice(0, 2).toUpperCase()}
                            </div>
                            <ChevronDown className="hidden sm:block h-4 w-4 text-stone-500" />
                        </button>

                        {showUserMenu ? (
                            <ProfilePanel
                                user={user}
                                onNavigate={(id: string) => {
                                    setActiveNavId(id);
                                    setShowUserMenu(false);
                                }}
                                onLogout={onLogout}
                                isLoggingOut={isLoggingOut}
                                onClose={() => setShowUserMenu(false)}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </header>
    );
}
