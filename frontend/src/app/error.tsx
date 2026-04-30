"use client";

import { useEffect } from "react";

import { handleGlobalError } from "@/lib/errors";

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
    useEffect(() => {
        handleGlobalError(error);
    }, [error]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
            <div className="max-w-xl rounded-4xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-300">
                    Something went wrong
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                    Application error
                </h1>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                    {error.message}
                </p>

                <button
                    type="button"
                    onClick={reset}
                    className="mt-8 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
