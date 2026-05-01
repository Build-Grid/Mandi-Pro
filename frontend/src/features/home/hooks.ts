import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchPublicReviews, submitReview } from "@/features/home/api";
import type { HomeReview, SubmitReviewDto } from "@/features/home/types";
import { handleGlobalError } from "@/lib/errors";
import { logger } from "@/lib/logger";

export const reviewKeys = {
    all: ["home", "reviews"] as const,
    detail: (id: number) => ["home", "reviews", id] as const,
};

export function usePublicReviews() {
    return useQuery<HomeReview[], Error>({
        queryKey: reviewKeys.all,
        queryFn: async () => {
            try {
                const reviews = await fetchPublicReviews();
                logger.info(
                    "Public reviews fetched successfully:",
                    reviews.length,
                );
                return reviews;
            } catch (error) {
                logger.error("Failed to fetch public reviews:", error);
                handleGlobalError(error);
                throw error;
            }
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
}

export function useSubmitReview() {
    const queryClient = useQueryClient();

    return useMutation<HomeReview, Error, SubmitReviewDto>({
        mutationFn: submitReview,
        onSuccess: () => {
            logger.info("Review submitted successfully");
            // Invalidate and refetch reviews
            queryClient.invalidateQueries({ queryKey: reviewKeys.all });
        },
        onError: (error) => {
            logger.error("Review submission failed:", error);
            handleGlobalError(error);
        },
    });
}
