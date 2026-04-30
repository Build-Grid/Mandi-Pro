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

export type HomeReview = {
    id: number;
    name: string;
    text: string;
    stars: number; // 1-5
    createdAt: string;
};
