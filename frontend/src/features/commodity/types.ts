import type { ApiResponse } from "@/common/types";

export type CommodityTypeRecord = {
    id: number;
    typeName: string;
    description?: string | null;
    firmId?: number;
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
};

export type CommodityRecord = {
    id: number;
    name: string;
    localName?: string | null;
    description?: string | null;
    unitCode?: string | null;
    commodityTypeName?: string | null;
    unitId?: number | null;
    commodityTypeId?: number | null;
    firmId?: number;
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
};

export type CommodityTypeFormValues = {
    typeName: string;
    description: string;
};

export type CommodityFormValues = {
    name: string;
    localName: string;
    description: string;
    unitId: number | null;
    commodityTypeId: number | null;
};

export type UpdateCommodityTypePayload = {
    id: number;
    typeName: string;
    description?: string;
};

export type UpdateCommodityPayload = {
    id: number;
    name: string;
    localName?: string;
    description?: string;
    unitId?: number | null;
    commodityTypeId?: number | null;
};

export type UnitRecord = {
    id: number;
    unitName: string;
    unitCode: string;
    unitType: string;
    baseUnitCode: string | null;
    conversionFactor: number;
};

export type UnitsByTypePayload = {
    unitsByType: Record<string, UnitRecord[]>;
};

export type CommodityTypeResponse = ApiResponse<CommodityTypeRecord[]>;
export type CommodityResponse = ApiResponse<CommodityRecord[]>;
export type UnitGroupedResponse = ApiResponse<UnitsByTypePayload>;