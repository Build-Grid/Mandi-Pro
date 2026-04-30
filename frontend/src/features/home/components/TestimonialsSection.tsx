"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { SectionHeading } from "@/features/home/components/SectionHeading";
import { testimonials } from "@/features/home/home-content";

export function TestimonialsSection() {
    const max = testimonials.length;
    const intervalRef = useRef<number | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        intervalRef.current = window.setInterval(() => {
            setActiveIndex((index) => (index + 1) % max);
        }, 5200);

        return () => {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
        };
    }, [max]);

    function prev() {
        setActiveIndex((index) => (index - 1 + max) % max);
    }

    function next() {
        setActiveIndex((index) => (index + 1) % max);
    }

    function highlightQuote(quote: string) {
        const words = quote.split(" ");
        const accent = words.slice(0, 4).join(" ");
        const remainder = words.slice(4).join(" ");

        return (
            <>
                <span className="font-semibold text-emerald-900">{accent}</span>
                {remainder ? ` ${remainder}` : ""}
            </>
        );
    }

    return (
        <section
            id="testimonials"
            className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
        >
            <SectionHeading
                eyebrow="Testimonials"
                title="Customer quotes that build confidence"
                description="Trusted by farmers, traders, and business operators"
            />

            <div className="relative mt-10 overflow-hidden rounded-3xl border border-emerald-100/70 bg-linear-to-br from-emerald-50/60 via-white to-amber-50/30 p-4 shadow-[0_18px_60px_rgba(6,78,59,0.08)] sm:p-6">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.16),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(34,197,94,0.12),transparent_45%)]" />

                <button
                    aria-label="Previous testimonials"
                    onClick={prev}
                    className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-emerald-100 bg-white/80 p-2 text-emerald-800 shadow-sm backdrop-blur transition duration-300 hover:bg-white"
                >
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 18l-6-6 6-6"
                        />
                    </svg>
                </button>

                <button
                    aria-label="Next testimonials"
                    onClick={next}
                    className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-emerald-100 bg-white/80 p-2 text-emerald-800 shadow-sm backdrop-blur transition duration-300 hover:bg-white"
                >
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 18l6-6-6-6"
                        />
                    </svg>
                </button>

                <div className="relative overflow-hidden rounded-[1.25rem]">
                    <div
                        className="flex transition-transform duration-700 ease-out"
                        style={{
                            transform: `translateX(-${activeIndex * (100 / max)}%)`,
                            width: `${max * 100}%`,
                        }}
                    >
                        {testimonials.map((t) => (
                            <figure
                                key={t.name}
                                className="w-full shrink-0 px-8 py-6 sm:px-14"
                                style={{ width: `${100 / max}%` }}
                            >
                                <div className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur sm:p-8">
                                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-emerald-100">
                                                <Image
                                                    src={t.avatar}
                                                    alt={t.name}
                                                    width={64}
                                                    height={64}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-lg font-semibold text-emerald-950">
                                                    {t.name}
                                                </p>
                                                <p className="mt-1 text-sm text-green-700/80">
                                                    {t.role}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50/70 px-3 py-1 text-amber-700">
                                            {Array.from({ length: 5 }).map(
                                                (_, index) => (
                                                    <svg
                                                        key={`${t.name}-star-${index}`}
                                                        viewBox="0 0 24 24"
                                                        className="h-3.5 w-3.5 fill-current"
                                                    >
                                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                                    </svg>
                                                ),
                                            )}
                                        </div>
                                    </div>

                                    <blockquote className="mt-6 text-lg leading-8 text-green-900/85 sm:text-xl sm:leading-9">
                                        &ldquo;{highlightQuote(t.quote)}&rdquo;
                                    </blockquote>

                                    <div className="mt-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-emerald-700/65">
                                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                        Verified Mandi Pro Customer
                                    </div>
                                </div>
                            </figure>
                        ))}
                    </div>
                </div>

                <div className="relative mt-5 flex items-center justify-center gap-2">
                    {testimonials.map((t, index) => (
                        <button
                            key={`${t.name}-dot`}
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Go to testimonial ${index + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                index === activeIndex
                                    ? "w-7 bg-emerald-600"
                                    : "w-2.5 bg-emerald-200 hover:bg-emerald-300"
                            }`}
                        />
                    ))}
                </div>

                <div className="relative mt-5 flex flex-col items-center justify-center gap-2 border-t border-emerald-100/70 pt-5 text-center sm:flex-row sm:gap-4">
                    <p className="text-sm font-semibold text-emerald-900">
                        10K+ users trust us
                    </p>
                    <span className="hidden h-1 w-1 rounded-full bg-amber-400 sm:block" />
                    <p className="text-sm text-green-700/80">
                        Real-time updates and transparent operations
                    </p>
                </div>

                <div className="relative mt-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700/55">
                    <span>Anaj Mart</span>
                    <span className="text-amber-500">•</span>
                    <span>MandiHub</span>
                    <span className="text-amber-500">•</span>
                    <span>AgriPulse</span>
                </div>
            </div>
        </section>
    );
}
