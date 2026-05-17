import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { handleGlobalError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import {
    createParty,
    createPartiesBulk,
    deleteParty,
    fetchParties,
    fetchPartyById,
    updateParty,
} from "./api";
import type { PartyFormValues, PartyRecord, UpdatePartyPayload } from "./types";

export const partyQueryKeys = {
    parties: ["parties"] as const,
    party: (id: number | string) => ["parties", id] as const,
};

export function useParties() {
    return useQuery({
        queryKey: partyQueryKeys.parties,
        queryFn: fetchParties,
        select: (response) => response.data,
    });
}

export function usePartyDetail(id: number | null) {
    return useQuery({
        queryKey: partyQueryKeys.party(id ?? "none"),
        queryFn: () => fetchPartyById(id as number),
        select: (response) => response.data,
        enabled: id !== null,
    });
}

export function useCreateParty() {
    const queryClient = useQueryClient();
    return useMutation<PartyRecord, Error, PartyFormValues>({
        mutationFn: (payload) => createParty(payload).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: partyQueryKeys.parties });
        },
        onError: (error) => {
            logger.error("Create party failed:", error);
            handleGlobalError(error);
        },
    });
}

export function useCreatePartiesBulk() {
    const queryClient = useQueryClient();
    return useMutation<PartyRecord[], Error, PartyFormValues[]>({
        mutationFn: (payload) =>
            createPartiesBulk(payload).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: partyQueryKeys.parties });
        },
        onError: (error) => {
            logger.error("Create parties bulk failed:", error);
            handleGlobalError(error);
        },
    });
}

export function useUpdateParty() {
    const queryClient = useQueryClient();
    return useMutation<PartyRecord, Error, UpdatePartyPayload>({
        mutationFn: (payload) => updateParty(payload).then((res) => res.data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: partyQueryKeys.parties });
            queryClient.invalidateQueries({
                queryKey: partyQueryKeys.party(variables.id),
            });
        },
        onError: (error) => {
            logger.error("Update party failed:", error);
            handleGlobalError(error);
        },
    });
}

export function useDeleteParty() {
    const queryClient = useQueryClient();
    return useMutation<unknown, Error, number>({
        mutationFn: (id) => deleteParty(id).then((res) => res.data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: partyQueryKeys.parties });
        },
        onError: (error) => {
            logger.error("Delete party failed:", error);
            handleGlobalError(error);
        },
    });
}
