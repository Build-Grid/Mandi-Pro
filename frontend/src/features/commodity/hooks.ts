import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { handleGlobalError } from "@/lib/errors";
import { logger } from "@/lib/logger";

import {
    createCommodity,
    createCommodityType,
    deleteCommodity,
    deleteCommodityType,
    fetchCommodityById,
    fetchCommodities,
    fetchCommodityTypeById,
    fetchCommodityTypes,
    fetchUnitsGrouped,
    updateCommodity,
    updateCommodityType,
} from "./api";
import type {
    CommodityFormValues,
    CommodityRecord,
    CommodityTypeFormValues,
    CommodityTypeRecord,
    UpdateCommodityPayload,
    UpdateCommodityTypePayload,
} from "./types";

export const commodityQueryKeys = {
    types: ["commodity-types"] as const,
    type: (id: number | string) => ["commodity-types", id] as const,
    commodities: ["commodities"] as const,
    commodity: (id: number | string) => ["commodities", id] as const,
    units: ["units", "grouped"] as const,
};

export function useUnitsGrouped() {
    return useQuery({
        queryKey: commodityQueryKeys.units,
        queryFn: fetchUnitsGrouped,
        select: (response) => response.data.unitsByType,
    });
}

export function useCommodityTypes() {
    return useQuery({
        queryKey: commodityQueryKeys.types,
        queryFn: fetchCommodityTypes,
        select: (response) => response.data,
    });
}

export function useCommodityTypeDetail(id: number | null) {
    return useQuery({
        queryKey: commodityQueryKeys.type(id ?? "none"),
        queryFn: () => fetchCommodityTypeById(id as number),
        select: (response) => response.data,
        enabled: id !== null,
    });
}

export function useCreateCommodityType() {
    const queryClient = useQueryClient();

    return useMutation<CommodityTypeRecord, Error, CommodityTypeFormValues>({
        mutationFn: (payload) =>
            createCommodityType(payload).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: commodityQueryKeys.types,
            });
        },
        onError: (error) => {
            logger.error("Create commodity type failed:", error);
            handleGlobalError(error);
        },
    });
}

export function useUpdateCommodityType() {
    const queryClient = useQueryClient();

    return useMutation<CommodityTypeRecord, Error, UpdateCommodityTypePayload>({
        mutationFn: (payload) =>
            updateCommodityType(payload).then((res) => res.data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: commodityQueryKeys.types,
            });
            queryClient.invalidateQueries({
                queryKey: commodityQueryKeys.type(variables.id),
            });
            queryClient.invalidateQueries({
                queryKey: commodityQueryKeys.commodities,
            });
        },
        onError: (error) => {
            logger.error("Update commodity type failed:", error);
            handleGlobalError(error);
        },
    });
}

export function useDeleteCommodityType() {
    const queryClient = useQueryClient();

    return useMutation<unknown, Error, number>({
        mutationFn: (id) => deleteCommodityType(id).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: commodityQueryKeys.types,
            });
            queryClient.invalidateQueries({
                queryKey: commodityQueryKeys.commodities,
            });
        },
        onError: (error) => {
            logger.error("Delete commodity type failed:", error);
            handleGlobalError(error);
        },
    });
}

export function useCommodities() {
    return useQuery({
        queryKey: commodityQueryKeys.commodities,
        queryFn: fetchCommodities,
        select: (response) => response.data,
    });
}

export function useCommodityDetail(id: number | null) {
    return useQuery({
        queryKey: commodityQueryKeys.commodity(id ?? "none"),
        queryFn: () => fetchCommodityById(id as number),
        select: (response) => response.data,
        enabled: id !== null,
    });
}

export function useCreateCommodity() {
    const queryClient = useQueryClient();

    return useMutation<CommodityRecord, Error, CommodityFormValues>({
        mutationFn: (payload) =>
            createCommodity(payload).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: commodityQueryKeys.commodities,
            });
        },
        onError: (error) => {
            logger.error("Create commodity failed:", error);
            handleGlobalError(error);
        },
    });
}

export function useUpdateCommodity() {
    const queryClient = useQueryClient();

    return useMutation<CommodityRecord, Error, UpdateCommodityPayload>({
        mutationFn: (payload) =>
            updateCommodity(payload).then((res) => res.data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: commodityQueryKeys.commodities,
            });
            queryClient.invalidateQueries({
                queryKey: commodityQueryKeys.commodity(variables.id),
            });
        },
        onError: (error) => {
            logger.error("Update commodity failed:", error);
            handleGlobalError(error);
        },
    });
}

export function useDeleteCommodity() {
    const queryClient = useQueryClient();

    return useMutation<unknown, Error, number>({
        mutationFn: (id) => deleteCommodity(id).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: commodityQueryKeys.commodities,
            });
        },
        onError: (error) => {
            logger.error("Delete commodity failed:", error);
            handleGlobalError(error);
        },
    });
}
