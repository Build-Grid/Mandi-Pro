import React, { ReactNode } from "react";

export default function AuthCard({
    children,
    aside,
}: {
    children: ReactNode;
    aside?: ReactNode;
}) {
    return (
        <div className="mx-auto w-full max-w-4xl rounded-2xl bg-white/80 shadow-xl backdrop-blur-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left aside panel — no padding, full height */}
                <div className="hidden md:flex flex-col bg-linear-to-b from-emerald-50 to-amber-50">
                    {aside ?? (
                        <div className="p-6 space-y-3">
                            <h3 className="text-2xl font-bold text-emerald-900">
                                Welcome to Mandi Pro
                            </h3>
                            <p className="text-sm text-neutral-600">
                                Build clearer margins, streamline purchases, and
                                keep farmer relationships at the center.
                            </p>
                        </div>
                    )}
                </div>

                {/* Right form panel */}
                <div className="flex items-center px-6 py-8 sm:px-10">
                    {children}
                </div>
            </div>
        </div>
    );
}