import type { DashboardData } from "./types";

// Lightweight mock API for dashboard data. Replace with real endpoints via apiClient.
export async function fetchDashboardData(): Promise<DashboardData> {
    // simulate network latency
    await new Promise((r) => setTimeout(r, 260));

    return {
        metrics: [
            {
                id: "revenue",
                label: "Revenue",
                value: "Rs 18.4L",
                delta: "+14.2%",
            },
            { id: "trades", label: "Trades", value: "238", delta: "+8.1%" },
            {
                id: "outstanding",
                label: "Outstanding",
                value: "Rs 3.1L",
                delta: "-2.7%",
            },
        ],
        recent: [
            {
                id: "t1",
                client: "Bharat Agro",
                commodity: "Soybean",
                amount: "Rs 1,28,000",
                status: "Settled",
                createdAt: new Date().toISOString(),
            },
            {
                id: "t2",
                client: "Shree Traders",
                commodity: "Wheat",
                amount: "Rs 74,500",
                status: "Pending",
                createdAt: new Date().toISOString(),
            },
            {
                id: "t3",
                client: "Narmada Foods",
                commodity: "Cotton",
                amount: "Rs 93,200",
                status: "Settled",
                createdAt: new Date().toISOString(),
            },
        ],
        inventory: [
            {
                id: "i1",
                name: "Soybean Bags",
                quantity: "1,280",
                status: "Healthy",
            },
            { id: "i2", name: "Wheat Bags", quantity: "420", status: "Low" },
            {
                id: "i3",
                name: "Fertilizer Units",
                quantity: "95",
                status: "Critical",
            },
        ],
    };
}
