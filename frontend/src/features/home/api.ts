import { apiClient } from "@/lib/api-client";
import { logger } from "@/lib/logger";
import type { HomeReview } from "./types";

export function fetchReviews(): Promise<HomeReview[]> {
    logger.info("Fetching home reviews");

    return apiClient<Array<Record<string, unknown>>>("/reviews").then((rows) =>
        rows.map((row, index) => {
            const text = String(row.text ?? row.review ?? "");
            const stars = Number(row.stars ?? row.star ?? 0);

            return {
                id: Number(row.id ?? index + 1),
                name: String(row.name ?? "Anonymous"),
                text,
                stars: Number.isFinite(stars) ? stars : 0,
                createdAt: String(row.createdAt ?? new Date().toISOString()),
            };
        }),
    );
}

export function postReview(
    payload: Omit<HomeReview, "id" | "createdAt">,
): Promise<HomeReview> {
    logger.info("Posting new review", { name: payload.name });

    return apiClient<HomeReview>("/reviews", {
        method: "POST",
        body: JSON.stringify({
            ...payload,
            review: payload.text,
            star: payload.stars,
        }),
    });
}
