export type Metric = {
    id: string;
    label: string;
    value: string;
    delta?: string;
};

export type Transaction = {
    id: string;
    client: string;
    commodity: string;
    amount: string;
    status: "Settled" | "Pending" | "Failed";
    createdAt: string;
};

export type InventoryItem = {
    id: string;
    name: string;
    quantity: string;
    status: "Healthy" | "Low" | "Critical";
};

export type DashboardData = {
    metrics: Metric[];
    recent: Transaction[];
    inventory: InventoryItem[];
};

export type DashboardWidgetId = "kpis" | "trend" | "transactions" | "inventory";

export type QuickAction = {
    id: string;
    label: string;
    description: string;
    icon: import("lucide-react").LucideIcon;
    keywords?: string[];
    run: () => void;
};
