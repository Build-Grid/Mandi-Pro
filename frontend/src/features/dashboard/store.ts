import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DEFAULT_WIDGET_ORDER, type DashboardWidgetId } from "./constants";

interface DashboardUIState {
    // Sidebar state
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;

    // Navigation state
    activeNavId: string;
    setActiveNavId: (id: string) => void;

    // Search states
    sidebarSearch: string;
    setSidebarSearch: (search: string) => void;
    actionSearch: string;
    setActionSearch: (search: string) => void;
    paletteSearch: string;
    setPaletteSearch: (search: string) => void;

    // Modal/menu states
    showPalette: boolean;
    setShowPalette: (show: boolean) => void;
    showUserMenu: boolean;
    setShowUserMenu: (show: boolean) => void;

    // Widget state
    widgetOrder: DashboardWidgetId[];
    setWidgetOrder: (order: DashboardWidgetId[]) => void;

    // Reset all
    reset: () => void;
}

const initialState = {
    sidebarCollapsed: false,
    activeNavId: "dashboard",
    sidebarSearch: "",
    actionSearch: "",
    paletteSearch: "",
    showPalette: false,
    showUserMenu: false,
    widgetOrder: DEFAULT_WIDGET_ORDER,
};

export const useDashboardStore = create<DashboardUIState>()(
    devtools(
        persist(
            (set) => ({
                ...initialState,
                setSidebarCollapsed: (collapsed) =>
                    set({ sidebarCollapsed: collapsed }),
                setActiveNavId: (id) => set({ activeNavId: id }),
                setSidebarSearch: (search) => set({ sidebarSearch: search }),
                setActionSearch: (search) => set({ actionSearch: search }),
                setPaletteSearch: (search) => set({ paletteSearch: search }),
                setShowPalette: (show) => set({ showPalette: show }),
                setShowUserMenu: (show) => set({ showUserMenu: show }),
                setWidgetOrder: (order) => set({ widgetOrder: order }),
                reset: () => set(initialState),
            }),
            {
                name: "dashboard-ui-state",
                partialize: (state) => ({
                    sidebarCollapsed: state.sidebarCollapsed,
                    activeNavId: state.activeNavId,
                    widgetOrder: state.widgetOrder,
                }),
            },
        ),
    ),
);
