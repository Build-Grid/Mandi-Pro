import type { PartyType } from "./types";

export const PARTY_PANEL_MODES = [
    "all",
    "party-entry",
    "party-catalog",
] as const;

export type PartyPanelMode = (typeof PARTY_PANEL_MODES)[number];

export const PARTY_TYPES: Array<{ value: PartyType; label: string }> = [
    { value: "FARMER", label: "Farmer" },
    { value: "DEALER", label: "Dealer" },
    { value: "BROKER", label: "Broker" },
    { value: "AGENT", label: "Agent" },
    { value: "TRANSPORTER", label: "Transporter" },
    { value: "LABOUR_CONTRACTOR", label: "Labour Contractor" },
    { value: "LENDER", label: "Lender" },
];
