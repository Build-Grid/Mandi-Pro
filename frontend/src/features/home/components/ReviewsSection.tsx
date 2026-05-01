"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePublicReviews } from "@/features/home/hooks";
import type { HomeReview } from "@/features/home/types";
import { sampleReviews } from "../home-content";

function StarRating({ value = 5 }: { value?: number }) {
    return (
        <div className="flex items-center gap-1" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="relative inline-block h-5 w-5">
                    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-slate-200">
                        <path d="M10 1.5l2.63 5.33 5.87.85-4.25 4.14 1 5.85L10 14.9l-5.25 2.77 1-5.85L1.5 7.68l5.87-.85L10 1.5z" />
                    </svg>
                    <span
                        className="absolute inset-y-0 left-0 overflow-hidden"
                        style={{
                            width:
                                value >= i + 1
                                    ? "100%"
                                    : value > i
                                      ? `${(value - i) * 100}%`
                                      : "0%",
                        }}
                    >
                        <svg
                            viewBox="0 0 20 20"
                            className="h-5 w-5 fill-amber-500"
                        >
                            <path d="M10 1.5l2.63 5.33 5.87.85-4.25 4.14 1 5.85L10 14.9l-5.25 2.77 1-5.85L1.5 7.68l5.87-.85L10 1.5z" />
                        </svg>
                    </span>
                </span>
            ))}
        </div>
    );
}

export function ReviewsSection() {
    const { data, isLoading } = usePublicReviews();

    const reviews = useMemo<HomeReview[]>(() => {
        if (!Array.isArray(data) || data.length === 0) {
            return sampleReviews;
        }
        return data;
    }, [data]);

    const average = useMemo(() => {
        if (!reviews.length) return 4.5;
        const total = reviews.reduce(
            (sum: number, item: HomeReview) => sum + item.rating,
            0,
        );
        return Math.round((total / reviews.length) * 10) / 10;
    }, [reviews]);

    const marqueeItems = [...reviews, ...reviews];
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [duration, setDuration] = useState(20); // fallback

    useEffect(() => {
        const calculate = () => {
            if (!marqueeRef.current) return;

            const width = marqueeRef.current.scrollWidth;

            const speed = 150; // px per second (tune this)
            const calculatedDuration = width / speed;

            setDuration(calculatedDuration);
        };

        calculate();

        window.addEventListener("resize", calculate);
        return () => window.removeEventListener("resize", calculate);
    }, [data]);

    return (
        <section
            id="reviews"
            className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
        >
            <div className="mb-12 space-y-3 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
                    Customer Stories
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-emerald-950">
                    Trusted by mandi traders and wholesalers
                </h2>
                <p className="mx-auto max-w-2xl text-base text-green-700/80">
                    Real voices from businesses managing trades, ledgers,
                    expenses, and profitability on Mandi-Pro
                </p>
            </div>

            <div className="mb-12 text-center">
                <div className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-amber-50 to-emerald-50 px-4 py-2 border border-amber-200">
                    <StarRating value={average} />
                    <span className="text-sm font-semibold text-amber-900">
                        {average.toFixed(1)} average rating
                    </span>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-white via-white/70 to-transparent" />
                <div className="absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-white via-white/70 to-transparent" />

                <div
                    ref={marqueeRef}
                    className={`review-marquee flex w-max gap-6 ${isLoading ? "opacity-50" : ""}`}
                    style={{
                        animationDuration: `${duration}s`,
                    }}
                >
                    {marqueeItems.map((item, index) => (
                        <article
                            key={`${item.id}-${index}`}
                            className="w-80 shrink-0 rounded-xl bg-white/90 p-5 shadow-sm backdrop-blur-sm transition duration-300 hover:shadow-md hover:bg-white"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-base font-semibold text-emerald-950">
                                        {item.name}
                                    </p>
                                    <div className="mt-1 flex items-center gap-1">
                                        <StarRating value={item.rating} />
                                        <span className="text-xs text-amber-700 font-medium">
                                            {item.rating.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 text-sm leading-6 text-slate-700">
                                &quot;{item.review}&quot;
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
