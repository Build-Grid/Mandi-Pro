"use client";

import { useState } from "react";
import { useSubmitReview } from "@/features/home/hooks";

function StarGlyph({ fill }: { fill: number }) {
    return (
        <span className="relative inline-block h-8 w-8">
            <svg viewBox="0 0 20 20" className="h-8 w-8 fill-emerald-100">
                <path d="M10 1.5l2.63 5.33 5.87.85-4.25 4.14 1 5.85L10 14.9l-5.25 2.77 1-5.85L1.5 7.68l5.87-.85L10 1.5z" />
            </svg>
            <span
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${Math.max(0, Math.min(fill, 1)) * 100}%` }}
            >
                <svg viewBox="0 0 20 20" className="h-8 w-8 fill-amber-400">
                    <path d="M10 1.5l2.63 5.33 5.87.85-4.25 4.14 1 5.85L10 14.9l-5.25 2.77 1-5.85L1.5 7.68l5.87-.85L10 1.5z" />
                </svg>
            </span>
        </span>
    );
}

function RatingPicker({
    value,
    onChange,
}: {
    value: number;
    onChange: (value: number) => void;
}) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => {
                const base = i + 1;
                const starFill = value >= base ? 1 : value > i ? value - i : 0;

                return (
                    <span key={base} className="relative inline-flex">
                        <StarGlyph fill={starFill} />
                        <button
                            type="button"
                            aria-label={`${i + 1} star half`}
                            onClick={() => onChange(i + 0.5)}
                            className="absolute left-0 top-0 h-8 w-4"
                        />
                        <button
                            type="button"
                            aria-label={`${i + 1} star full`}
                            onClick={() => onChange(i + 1)}
                            className="absolute right-0 top-0 h-8 w-4"
                        />
                    </span>
                );
            })}
            <span className="ml-2 text-sm font-semibold text-emerald-800">
                {value.toFixed(1)}
            </span>
        </div>
    );
}

export function SubmitReview() {
    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(4.5);
    const [successMessage, setSuccessMessage] = useState("");
    const mutation = useSubmitReview();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMessage("");
        mutation.mutate(
            { name, review, rating: String(rating) },
            {
                onSuccess: () => {
                    setSuccessMessage(
                        "Thank you! Your review has been submitted.",
                    );
                    setName("");
                    setReview("");
                    setRating(4.5);
                    setTimeout(() => setSuccessMessage(""), 3000);
                },
            },
        );
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-8 grid gap-4 rounded-2xl border border-amber-200 bg-linear-to-br from-amber-50 via-emerald-50 to-green-50 p-5 shadow-sm sm:grid-cols-2 sm:p-6 transition duration-300 hover:shadow-md"
        >
            {successMessage && (
                <div className="sm:col-span-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800">
                    {successMessage}
                </div>
            )}

            {mutation.isError && (
                <div className="sm:col-span-2 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                    Failed to submit review. Please try again.
                </div>
            )}

            <div className="sm:col-span-2 grid gap-2">
                <label className="text-sm font-medium text-emerald-800">
                    Name
                </label>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={mutation.isPending}
                    className="rounded-xl border border-amber-200 bg-white px-3 py-2.5 text-slate-900 outline-none ring-amber-400 transition duration-200 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Your name"
                    required
                />
            </div>

            <div className="sm:col-span-2 grid gap-2">
                <label className="text-sm font-medium text-emerald-800">
                    Review
                </label>
                <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    disabled={mutation.isPending}
                    rows={4}
                    className="rounded-xl border border-amber-200 bg-white px-3 py-2.5 text-slate-900 outline-none ring-amber-400 transition duration-200 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Tell others about your experience"
                    required
                />
            </div>

            <div className="grid gap-2 sm:col-span-2">
                <label className="text-sm font-medium text-emerald-800">
                    Rating
                </label>
                <RatingPicker value={rating} onChange={setRating} />
                <p className="text-xs text-emerald-700/90">
                    Click left half for 0.5 and right half for full star.
                </p>
            </div>

            <div className="sm:col-span-2 flex items-end justify-end">
                <button
                    type="submit"
                    disabled={
                        mutation.isPending || !name.trim() || !review.trim()
                    }
                    className="rounded-full bg-linear-to-r from-amber-600 to-amber-700 px-5 py-2.5 text-white shadow shadow-amber-600/30 transition duration-300 hover:shadow-lg hover:shadow-amber-600/40 hover:from-amber-700 hover:to-amber-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {mutation.isPending ? "Submitting..." : "Submit Review"}
                </button>
            </div>
        </form>
    );
}
