import type { RoleConstants } from "@/common/types";

export const COMMODITY_PANEL_MODES = [
    "all",
    "commodity-type-entry",
    "commodity-entry",
    "commodity-type-catalog",
    "commodity-catalog",
] as const;

export type CommodityPanelMode = (typeof COMMODITY_PANEL_MODES)[number];

export const COMMODITY_WRITE_CHILD_IDS = [
    "commodity-type-entry",
    "commodity-entry",
] as const;

export const COMMODITY_UNIT_OPTIONS = [
    { id: 1, label: "Kilogram", shortLabel: "kg" },
    { id: 2, label: "Quintal", shortLabel: "qtl" },
    { id: 3, label: "Bag", shortLabel: "bag" },
    { id: 4, label: "Ton", shortLabel: "ton" },
    { id: 5, label: "Piece", shortLabel: "pc" },
] as const;

export function canManageCommodityCatalog(role: RoleConstants) {
    return role === "OWNER" || role === "MANAGER";
}
