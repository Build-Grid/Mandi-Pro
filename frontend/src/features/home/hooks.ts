import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchReviews, postReview } from "./api";
import type { HomeReview } from "./types";
import { handleGlobalError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export const reviewKeys = {
    all: ["home", "reviews"] as const,
    detail: (id: number) => ["home", "reviews", id] as const,
};

export function useReviews() {
    return useQuery<HomeReview[], Error>({
        queryKey: reviewKeys.all,
        queryFn: async () => {
            try {
                return await fetchReviews();
            } catch (err) {
                logger.error("Failed to fetch reviews:", err);
                handleGlobalError(err);
                throw err;
            }
        },
    });
}

export function useSubmitReview() {
    const qc = useQueryClient();

    return useMutation<HomeReview, Error, Omit<HomeReview, "id" | "createdAt">>(
        {
            mutationFn: (data) => postReview(data),
            onSuccess: async () => {
                await qc.invalidateQueries({ queryKey: reviewKeys.all });
            },
            onError: (err) => {
                logger.error("Submit review failed:", err);
                handleGlobalError(err);
            },
        },
    );
}
