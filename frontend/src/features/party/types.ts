import type { ApiResponse } from "@/common/types";

export type PartyType =
    | "FARMER"
    | "DEALER"
    | "BROKER"
    | "AGENT"
    | "TRANSPORTER"
    | "LABOUR_CONTRACTOR"
    | "LENDER";

export type PartyRecord = {
    id: number;
    name: string;
    type: PartyType;
    contactNumber: string;
    address?: string | null;
    village?: string | null;
    description?: string | null;
    status?: string | null;
    firmId?: number;
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
};

export type PartyFormValues = {
    name: string;
    type: PartyType;
    contactNumber: string;
    address: string;
    village: string;
    description: string;
};

export type UpdatePartyPayload = {
    id: number;
    name: string;
    type: PartyType;
    contactNumber: string;
    address?: string;
    village?: string;
    description?: string;
};

export type PartyResponse = ApiResponse<PartyRecord[]>;
