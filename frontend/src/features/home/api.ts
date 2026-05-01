import { apiClient } from "@/lib/api-client";
import { logger } from "@/lib/logger";

import type {
    HomeReview,
    HomeReviewResponse,
    SubmitReviewDto,
    SubmitReviewResponse,
} from "@/features/home/types";

export function fetchPublicReviews(): Promise<HomeReview[]> {
    logger.info("Fetching public reviews");
    return apiClient<HomeReviewResponse>("/review/fetch/public").then(
        (response) => response.data,
    );
}

export function submitReview(data: SubmitReviewDto): Promise<HomeReview> {
    logger.info("Submitting review from:", data.name);
    return apiClient<SubmitReviewResponse>("/review/post", {
        method: "POST",
        body: JSON.stringify(data),
    }).then((response) => response.data);
}
