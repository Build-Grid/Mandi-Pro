import type { LucideIcon } from "lucide-react";
import {
    ArrowLeftRight,
    Banknote,
    BarChart3,
    BookText,
    CirclePlus,
    ClipboardList,
    FileChartColumnIncreasing,
    Globe,
    HandCoins,
    LayoutDashboard,
    LineChart,
    Package,
    Settings2,
    UserPlus,
} from "lucide-react";

export type NavChild = {
    id: string;
    label: string;
    description: string;
    icon: LucideIcon;
};

export type NavItem = {
    id: string;
    label: string;
    description: string;
    icon: LucideIcon;
    children?: NavChild[];
};

export type NavSection = {
    title: string;
    items: NavItem[];
};

export type SidebarSelection = {
    sectionTitle: string;
    parentLabel: string;
    label: string;
    description: string;
    crumbs: string[];
};

export const NAV_SECTIONS: NavSection[] = [
    {
        title: "Main",
        items: [
            {
                id: "dashboard",
                label: "Dashboard",
                description: "Overview and personalization",
                icon: LayoutDashboard,
            },
            {
                id: "trade",
                label: "Trade",
                description: "Purchase and sale entries",
                icon: ArrowLeftRight,
                children: [
                    {
                        id: "trade-create",
                        label: "Create trade entry",
                        description: "Open a new sale or purchase record",
                        icon: CirclePlus,
                    },
                    {
                        id: "trade-list",
                        label: "Trade entries",
                        description: "Review recent deals and settlements",
                        icon: ClipboardList,
                    },
                    {
                        id: "trade-claims",
                        label: "Claims",
                        description: "Track deductions and customer claims",
                        icon: HandCoins,
                    },
                ],
            },
            {
                id: "commodity",
                label: "Commodity",
                description: "Crop and stock catalog",
                icon: Package,
                children: [
                    {
                        id: "commodity-add",
                        label: "Add commodity",
                        description: "Create new crop or bag types",
                        icon: CirclePlus,
                    },
                    {
                        id: "commodity-catalog",
                        label: "Commodity catalog",
                        description: "View all active stock items",
                        icon: ClipboardList,
                    },
                ],
            },
        ],
    },
    {
        title: "Operations",
        items: [
            {
                id: "inventory",
                label: "Inventory",
                description: "Stock movement and alerts",
                icon: LineChart,
                children: [
                    {
                        id: "inventory-stock",
                        label: "Stock movement",
                        description: "Inspect in-flow and out-flow",
                        icon: ClipboardList,
                    },
                    {
                        id: "inventory-alerts",
                        label: "Low stock alerts",
                        description: "Review replenishment warnings",
                        icon: HandCoins,
                    },
                ],
            },
            {
                id: "ledger",
                label: "Ledger",
                description: "Accounts, claims, and balance",
                icon: BookText,
                children: [
                    {
                        id: "ledger-claims",
                        label: "Claims register",
                        description: "Customer and broker claim tracking",
                        icon: HandCoins,
                    },
                    {
                        id: "ledger-journal",
                        label: "Journal entries",
                        description: "Adjustments, advances, and balance",
                        icon: ClipboardList,
                    },
                ],
            },
            {
                id: "expenses",
                label: "Expenses",
                description: "Handling and logistics costs",
                icon: Banknote,
                children: [
                    {
                        id: "expenses-log",
                        label: "Log expense",
                        description: "Record transport or handling cost",
                        icon: CirclePlus,
                    },
                    {
                        id: "expenses-view",
                        label: "Expense ledger",
                        description: "Review recurring spending",
                        icon: ClipboardList,
                    },
                ],
            },
        ],
    },
    {
        title: "Insights",
        items: [
            {
                id: "reports",
                label: "Reports",
                description: "Profit, loss, and performance",
                icon: FileChartColumnIncreasing,
                children: [
                    {
                        id: "reports-profit",
                        label: "Profit & loss",
                        description: "Monthly performance summary",
                        icon: BarChart3,
                    },
                    {
                        id: "reports-growth",
                        label: "Growth trends",
                        description: "Compare branch and commodity trends",
                        icon: Globe,
                    },
                ],
            },
            {
                id: "marketplace",
                label: "Marketplace",
                description: "Branch and pricing views",
                icon: Globe,
                children: [
                    {
                        id: "marketplace-pricing",
                        label: "Pricing board",
                        description: "Live commodity price board",
                        icon: BarChart3,
                    },
                ],
            },
        ],
    },
    {
        title: "Admin",
        items: [
            {
                id: "admin",
                label: "Settings",
                description: "Preferences and access control",
                icon: Settings2,
                children: [
                    {
                        id: "admin-users",
                        label: "Manage users",
                        description: "Invite staff and manage roles",
                        icon: UserPlus,
                    },
                    {
                        id: "admin-firm",
                        label: "Firm settings",
                        description: "Company details and security",
                        icon: Settings2,
                    },
                ],
            },
        ],
    },
];

export function getSidebarSelection(id: string): SidebarSelection {
    for (const section of NAV_SECTIONS) {
        for (const item of section.items) {
            if (item.id === id) {
                return {
                    sectionTitle: section.title,
                    parentLabel: item.label,
                    label: item.label,
                    description: item.description,
                    crumbs: [
                        section.title.toUpperCase(),
                        item.label.toUpperCase(),
                    ],
                };
            }

            for (const child of item.children ?? []) {
                if (child.id === id) {
                    return {
                        sectionTitle: section.title,
                        parentLabel: item.label,
                        label: child.label,
                        description: child.description,
                        crumbs: [
                            section.title.toUpperCase(),
                            item.label.toUpperCase(),
                            child.label.toUpperCase(),
                        ],
                    };
                }
            }
        }
    }

    return {
        sectionTitle: "Main",
        parentLabel: "Dashboard",
        label: "Dashboard",
        description: "Overview and personalization",
        crumbs: ["MAIN", "DASHBOARD"],
    };
}

export type DashboardWidgetId = "kpis" | "trend" | "transactions" | "inventory";

export const DEFAULT_WIDGET_ORDER: DashboardWidgetId[] = [
    "kpis",
    "trend",
    "transactions",
    "inventory",
];

export function getWidgetClass(widgetId: DashboardWidgetId) {
    if (widgetId === "kpis") {
        return "sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-3";
    }

    if (widgetId === "trend") {
        return "sm:col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4";
    }

    if (widgetId === "transactions") {
        return "sm:col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-3";
    }

    return "sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2";
}
