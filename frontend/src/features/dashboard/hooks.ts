"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    BarChart3,
    LayoutDashboard,
    LayoutGrid,
    Package,
    UserPlus,
    Users,
} from "lucide-react";
import { NAV_SECTIONS, type NavSection } from "./constants";
import { fetchDashboardData } from "./api";
import type { DashboardData, QuickAction } from "./types";
import type { User } from "@/common/types";

export function useDashboardData() {
    return useQuery<DashboardData>({
        queryKey: ["dashboard", "data"],
        queryFn: fetchDashboardData,
        staleTime: 1000 * 30,
        refetchOnWindowFocus: false,
    });
}

type UseDashboardSidebarGroupsProps = {
    sidebarSearch: string;
    user: User;
};

export function useDashboardSidebarGroups({
    sidebarSearch,
    user,
}: UseDashboardSidebarGroupsProps) {
    return useMemo<NavSection[]>(() => {
        const query = sidebarSearch.trim().toLowerCase();

        return NAV_SECTIONS.map((section) => {
            const items: NavSection["items"] = [];

            for (const item of section.items) {
                const childMatches = item.children?.filter((child) => {
                    if (!query) return true;
                    return (
                        child.label.toLowerCase().includes(query) ||
                        child.description.toLowerCase().includes(query)
                    );
                });

                const itemMatches =
                    !query ||
                    item.label.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query);

                if (
                    !itemMatches &&
                    (!childMatches || childMatches.length === 0)
                ) {
                    continue;
                }

                items.push({
                    ...item,
                    children: query ? (childMatches ?? []) : item.children,
                });
            }

            return {
                ...section,
                items,
            };
        })
            .filter((section) => {
                if (section.title === "Admin") {
                    return user.role === "OWNER" || user.role === "MANAGER";
                }

                return true;
            })
            .filter((section) => section.items.length > 0);
    }, [sidebarSearch, user.role]);
}

type UseQuickActionsProps = {
    actionSearch: string;
    paletteSearch: string;
    setActiveNavId: (id: string) => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    setWidgetOrder: (
        order: Array<"kpis" | "trend" | "transactions" | "inventory">,
    ) => void;
    sidebarCollapsed: boolean;
    user: User;
};

export function useQuickActions({
    actionSearch,
    paletteSearch,
    setActiveNavId,
    setSidebarCollapsed,
    setWidgetOrder,
    sidebarCollapsed,
    user,
}: UseQuickActionsProps) {
    const quickActions = useMemo<QuickAction[]>(() => {
        const actions: QuickAction[] = [
            {
                id: "go-dashboard",
                label: "Go to dashboard",
                description: "View your personalized workspace",
                icon: LayoutDashboard,
                keywords: ["dashboard", "home", "overview"],
                run: () => setActiveNavId("dashboard"),
            },
            {
                id: "toggle-sidebar",
                label: sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar",
                description: sidebarCollapsed
                    ? "Show the full navigation panel"
                    : "Hide the navigation panel",
                icon: Package,
                keywords: ["sidebar", "expand", "collapse", "toggle"],
                run: () => setSidebarCollapsed(!sidebarCollapsed),
            },
            {
                id: "reorder-widgets",
                label: "Reset widget order",
                description: "Restore default widget layout",
                icon: LayoutGrid,
                keywords: ["widget", "order", "reset", "layout"],
                run: () =>
                    setWidgetOrder([
                        "kpis",
                        "trend",
                        "transactions",
                        "inventory",
                    ]),
            },
        ];

        for (const section of NAV_SECTIONS) {
            if (
                section.title === "Admin" &&
                !(user.role === "OWNER" || user.role === "MANAGER")
            ) {
                continue;
            }

            for (const item of section.items) {
                actions.push({
                    id: item.id,
                    label: item.label,
                    description: item.description,
                    icon: item.icon,
                    keywords: [
                        item.label.toLowerCase(),
                        section.title.toLowerCase(),
                    ],
                    run: () => {
                        setActiveNavId(item.id);
                        setSidebarCollapsed(true);
                    },
                });
            }
        }

        if (user.role === "OWNER" || user.role === "MANAGER") {
            actions.push(
                {
                    id: "invite-user",
                    label: "Invite user",
                    description: "Open invite user form",
                    icon: UserPlus,
                    keywords: ["invite", "user", "team"],
                    run: () => {
                        setActiveNavId("admin-users");
                        setSidebarCollapsed(true);
                    },
                },
                {
                    id: "pending-invites",
                    label: "Pending invites",
                    description: "Show pending team invites",
                    icon: Users,
                    keywords: ["invites", "pending", "invite"],
                    run: () => {
                        setActiveNavId("admin-users");
                        setSidebarCollapsed(true);
                    },
                },
                {
                    id: "team-members",
                    label: "Team members",
                    description: "View team members",
                    icon: Users,
                    keywords: ["team", "members", "users"],
                    run: () => {
                        setActiveNavId("admin-users");
                        setSidebarCollapsed(true);
                    },
                },
                {
                    id: "firm-profile",
                    label: "Firm profile",
                    description: "Open firm settings",
                    icon: BarChart3,
                    keywords: ["firm", "company", "profile"],
                    run: () => {
                        setActiveNavId("admin-firm");
                        setSidebarCollapsed(true);
                    },
                },
            );
        }

        return actions;
    }, [
        setActiveNavId,
        setSidebarCollapsed,
        setWidgetOrder,
        sidebarCollapsed,
        user.role,
    ]);

    const actionResults = useMemo(() => {
        if (!actionSearch.trim()) return [];

        const query = actionSearch.toLowerCase();
        return quickActions
            .filter((action) => {
                const label = action.label.toLowerCase();
                const description = action.description.toLowerCase();
                const keywords = (action.keywords || []).join(" ");

                return (
                    label.includes(query) ||
                    description.includes(query) ||
                    keywords.includes(query)
                );
            })
            .slice(0, 5);
    }, [actionSearch, quickActions]);

    const paletteResults = useMemo(() => {
        if (!paletteSearch.trim()) return quickActions.slice(0, 8);

        const query = paletteSearch.toLowerCase();
        return quickActions
            .filter((action) => {
                const label = action.label.toLowerCase();
                const description = action.description.toLowerCase();
                const keywords = (action.keywords || []).join(" ");

                return (
                    label.includes(query) ||
                    description.includes(query) ||
                    keywords.includes(query)
                );
            })
            .slice(0, 8);
    }, [paletteSearch, quickActions]);

    return {
        quickActions,
        actionResults,
        paletteResults,
    };
}
