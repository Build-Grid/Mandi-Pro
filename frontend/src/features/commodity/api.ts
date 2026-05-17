import { apiClient } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import type {
    CommodityFormValues,
    CommodityRecord,
    CommodityTypeFormValues,
    CommodityTypeRecord,
    CommodityResponse,
    CommodityTypeResponse,
    UnitGroupedResponse,
} from "./types";
import type { ApiResponse } from "@/common/types";

export function fetchCommodityTypes(): Promise<CommodityTypeResponse> {
    logger.info("Fetching commodity types");
    return apiClient<CommodityTypeResponse>("/commodity-type/fetch");
}

export function fetchCommodityTypeById(
    id: number | string,
): Promise<ApiResponse<CommodityTypeRecord>> {
    logger.info("Fetching commodity type by id", id);
    return apiClient<ApiResponse<CommodityTypeRecord>>(
        `/commodity-type/fetch/${id}`,
    );
}

export function createCommodityType(
    payload: CommodityTypeFormValues,
): Promise<ApiResponse<CommodityTypeRecord>> {
    logger.info("Creating commodity type", payload);
    return apiClient<ApiResponse<CommodityTypeRecord>>(
        "/commodity-type/create",
        {
            method: "POST",
            body: JSON.stringify(payload),
        },
    );
}

export function updateCommodityType(payload: {
    id: number;
    typeName: string;
    description?: string;
}): Promise<ApiResponse<CommodityTypeRecord>> {
    logger.info("Updating commodity type", payload.id);
    return apiClient<ApiResponse<CommodityTypeRecord>>(
        "/commodity-type/update",
        {
            method: "PATCH",
            body: JSON.stringify(payload),
        },
    );
}

export function deleteCommodityType(
    id: number | string,
): Promise<ApiResponse<null>> {
    logger.info("Deleting commodity type", id);
    return apiClient<ApiResponse<null>>(`/commodity-type/delete/${id}`, {
        method: "DELETE",
    });
}

export function fetchCommodities(): Promise<CommodityResponse> {
    logger.info("Fetching commodities");
    return apiClient<CommodityResponse>("/commodity/fetch");
}

export function fetchCommodityById(
    id: number | string,
): Promise<ApiResponse<CommodityRecord>> {
    logger.info("Fetching commodity by id", id);
    return apiClient<ApiResponse<CommodityRecord>>(`/commodity/fetch/${id}`);
}

export function createCommodity(
    payload: CommodityFormValues,
): Promise<ApiResponse<CommodityRecord>> {
    logger.info("Creating commodity", payload);
    return apiClient<ApiResponse<CommodityRecord>>("/commodity/create", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function updateCommodity(payload: {
    id: number;
    name: string;
    localName?: string;
    description?: string;
    unitId?: number | null;
    commodityTypeId?: number | null;
}): Promise<ApiResponse<CommodityRecord>> {
    logger.info("Updating commodity", payload.id);
    return apiClient<ApiResponse<CommodityRecord>>(
        `/commodity/update/${payload.id}`,
        {
            method: "PATCH",
            body: JSON.stringify(payload),
        },
    );
}

export function deleteCommodity(
    id: number | string,
): Promise<ApiResponse<null>> {
    logger.info("Deleting commodity", id);
    return apiClient<ApiResponse<null>>(`/commodity/delete/${id}`, {
        method: "DELETE",
    });
}

export function fetchUnitsGrouped(): Promise<UnitGroupedResponse> {
    logger.info("Fetching units grouped by type");
    return apiClient<UnitGroupedResponse>("/unit/fetch");
}