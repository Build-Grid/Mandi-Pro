import { apiClient } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import type { ApiResponse } from "@/common/types";
import type {
    PartyFormValues,
    PartyRecord,
    PartyResponse,
    UpdatePartyPayload,
} from "./types";

export function fetchParties(): Promise<PartyResponse> {
    logger.info("Fetching parties");
    return apiClient<PartyResponse>("/parties");
}

export function fetchPartyById(
    id: number | string,
): Promise<ApiResponse<PartyRecord>> {
    logger.info("Fetching party by id", id);
    return apiClient<ApiResponse<PartyRecord>>(`/parties/${id}`);
}

export function createParty(
    payload: PartyFormValues,
): Promise<ApiResponse<PartyRecord>> {
    logger.info("Creating party", payload);
    return apiClient<ApiResponse<PartyRecord>>("/parties", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function createPartiesBulk(
    payload: PartyFormValues[],
): Promise<ApiResponse<PartyRecord[]>> {
    logger.info("Creating parties in bulk", payload.length);
    return apiClient<ApiResponse<PartyRecord[]>>("/parties/bulk", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function updateParty(
    payload: UpdatePartyPayload,
): Promise<ApiResponse<PartyRecord>> {
    logger.info("Updating party", payload.id);
    return apiClient<ApiResponse<PartyRecord>>(`/parties/${payload.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
}

export function deleteParty(id: number | string): Promise<ApiResponse<null>> {
    logger.info("Deleting party", id);
    return apiClient<ApiResponse<null>>(`/parties/${id}`, {
        method: "DELETE",
    });
}
