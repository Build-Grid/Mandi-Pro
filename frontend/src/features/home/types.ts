import { ApiResponse } from "@/common/types";

export type HomeNavigationItem = {
    label: string;
    href: string;
};

export type HomeFeatureIcon = "dashboard" | "users" | "chart" | "device";

export type HomeFeature = {
    title: string;
    description: string;
    icon: HomeFeatureIcon;
};

export type HomeTestimonial = {
    name: string;
    role: string;
    quote: string;
    initials: string;
    avatar: string;
};

export type HomeFaq = {
    question: string;
    answer: string;
};

export type ReviewStatus = "APPROVED" | "PENDING" | "REJECTED";

export type HomeReview = {
    id: number;
    name: string;
    review: string;
    rating: number; // can be decimal like 4.5
    reviewStatus: ReviewStatus;
    createdAt: string;
    updatedAt: string;
};

export interface SubmitReviewDto {
    name: string;
    review: string;
    rating: string | number;
}

export type HomeReviewResponse = ApiResponse<HomeReview[]>;
export type SubmitReviewResponse = ApiResponse<HomeReview>;
