import type {
    HomeFaq,
    HomeFeature,
    HomeNavigationItem,
    HomeReview,
    HomeTestimonial,
} from "@/features/home/types";

export const navigationItems = [
    { label: "Features", href: "#features" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
] satisfies readonly HomeNavigationItem[];

export const features = [
    {
        title: "Trade tracking from buy to sell",
        description:
            "Track every mandi transaction with party, product, quantity, rate, and status in one structured workflow.",
        icon: "dashboard",
    },
    {
        title: "Financial and cashflow management",
        description:
            "Monitor inflow and outflow across purchases, sales, claims, and daily operational expenses.",
        icon: "users",
    },
    {
        title: "Ledger and performance insights",
        description:
            "Maintain party, grain, and trade ledgers while viewing instant profit and loss on every deal.",
        icon: "chart",
    },
    {
        title: "Claims, damages, and expenses",
        description:
            "Record tola, bora, labor, transport, disputes, and damage adjustments without manual bookkeeping.",
        icon: "device",
    },
] satisfies readonly HomeFeature[];

export const testimonials = [
    {
        name: "Priya Sharma",
        role: "Mandi Operations Lead",
        quote: "The interface feels calm and organized, which makes it much easier for our team to move quickly without missing details.",
        initials: "P",
        avatar: "/home/avatars/Priya.jpg",
    },
    {
        name: "Arjun Mehta",
        role: "Grain Trader",
        quote: "I can now track buy and sell trades with accurate margins, and daily profit and loss is visible in minutes.",
        initials: "A",
        avatar: "/home/avatars/Arjun.jpg",
    },
    {
        name: "Nitin Kapoor",
        role: "Wholesaler",
        quote: "Ledger management for parties and products is finally streamlined, and reconciliation is far faster than before.",
        initials: "N",
        avatar: "/home/avatars/Nitin.jpg",
    },
    {
        name: "Kishan Rampuri",
        role: "Trading Supervisor",
        quote: "Claims, damages, and mandi expenses are now tracked in one place, so our team avoids costly blind spots.",
        initials: "K",
        avatar: "/home/avatars/Kishan.jpg",
    },
] satisfies readonly HomeTestimonial[];

export const faqs = [
    {
        question: "Who is Mandi-Pro built for?",
        answer: "Mandi-Pro is designed for mandi traders, grain wholesalers, and agri businesses that buy, process, package, and sell produce.",
    },
    {
        question: "What operations can I track in one place?",
        answer: "You can manage buy and sell trades, party and product ledgers, cashflow, expenses, claims, damages, and per-trade profit and loss.",
    },
    {
        question: "Can I track mandi-specific expenses like tola and bora?",
        answer: "Yes. Mandi-Pro includes dedicated expense tracking for tola, bora, labor, transport, and other adjustment entries.",
    },
    {
        question: "Does Mandi-Pro help reduce manual bookkeeping errors?",
        answer: "Yes. Centralized digital records reduce fragmented entries and improve visibility for faster and more accurate decisions.",
    },
] satisfies readonly HomeFaq[];

export const reviewLogos = [
    "Anaj Mart",
    "Krishi Link",
    "MandiHub",
    "Grain Flow",
    "AgriPulse",
] as const;

export const sampleReviews = [
    {
        id: 1,
        name: "Amit",
        review: "Buy and sell entries are now visible in one place, and my daily margin checks are much faster.",
        rating: 4.5,
        reviewStatus: "APPROVED",
        createdAt: "2026-05-01T21:54:13",
        updatedAt: "2026-05-01T21:54:13",
    },
    {
        id: 2,
        name: "Meera",
        review: "Tracking party ledgers and mandi expenses like labor and transport is now simple and accurate.",
        rating: 5,
        reviewStatus: "APPROVED",
        createdAt: "2026-05-01T21:54:13",
        updatedAt: "2026-05-01T21:54:13",
    },
    {
        id: 3,
        name: "Ravi",
        review: "We moved from notebooks to digital records and can now monitor claims and damages without confusion.",
        rating: 4.5,
        reviewStatus: "APPROVED",
        createdAt: "2026-05-01T21:54:13",
        updatedAt: "2026-05-01T21:54:13",
    },
    {
        id: 4,
        name: "Kirtan",
        review: "Profit and loss per trade is instant, which helps us make better pricing decisions throughout the day.",
        rating: 4.5,
        reviewStatus: "APPROVED",
        createdAt: "2026-05-01T21:54:13",
        updatedAt: "2026-05-01T21:54:13",
    },
    {
        id: 5,
        name: "Mukesh",
        review: "My team can track tola, bora, and other costs without missing entries in manual books.",
        rating: 4.5,
        reviewStatus: "APPROVED",
        createdAt: "2026-05-01T21:54:13",
        updatedAt: "2026-05-01T21:54:13",
    },
    {
        id: 6,
        name: "Mansaram",
        review: "Mandi-Pro gives us clean visibility across trades, finances, and outstanding party balances.",
        rating: 4.5,
        reviewStatus: "APPROVED",
        createdAt: "2026-05-01T21:54:13",
        updatedAt: "2026-05-01T21:54:13",
    },
    {
        id: 7,
        name: "Suresh",
        review: "Invoice tracking and settlement reconciliation are much easier than before.",
        rating: 4,
        reviewStatus: "APPROVED",
        createdAt: "2026-05-01T21:54:13",
        updatedAt: "2026-05-01T21:54:13",
    },
    {
        id: 8,
        name: "Neha",
        review: "We reduced manual errors in accounting and improved reporting accuracy significantly.",
        rating: 5,
        reviewStatus: "APPROVED",
        createdAt: "2026-05-01T21:54:13",
        updatedAt: "2026-05-01T21:54:13",
    },
] satisfies readonly HomeReview[];
