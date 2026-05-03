export default function Loading() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f5f0e8]">
            {/* Subtle radial bg tint */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle at 20% 20%, rgba(180,162,109,0.10) 0%, transparent 60%),
                            radial-gradient(circle at 80% 80%, rgba(107,142,35,0.07) 0%, transparent 55%)`,
                }}
            />

            {/* Corner leaf accents */}
            <svg
                className="absolute -left-4 -top-4 opacity-[0.06] rotate-[-30deg]"
                width="220"
                height="220"
                viewBox="0 0 220 220"
                fill="none"
            >
                <ellipse
                    cx="110"
                    cy="110"
                    rx="90"
                    ry="40"
                    fill="#3b6d11"
                    transform="rotate(-20 110 110)"
                />
                <line
                    x1="20"
                    y1="110"
                    x2="200"
                    y2="110"
                    stroke="#3b6d11"
                    strokeWidth="3"
                />
            </svg>
            <svg
                className="absolute -bottom-4 -right-4 opacity-[0.06] rotate-150"
                width="220"
                height="220"
                viewBox="0 0 220 220"
                fill="none"
            >
                <ellipse
                    cx="110"
                    cy="110"
                    rx="90"
                    ry="40"
                    fill="#3b6d11"
                    transform="rotate(-20 110 110)"
                />
                <line
                    x1="20"
                    y1="110"
                    x2="200"
                    y2="110"
                    stroke="#3b6d11"
                    strokeWidth="3"
                />
            </svg>

            <div className="relative z-10 flex flex-col items-center gap-6">
                {/* Logo mark */}
                <div className="flex items-center justify-center w-16 h-16 rounded-[18px] bg-[#2d6a4f] animate-[pulse-mark_2.4s_ease-in-out_infinite]">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <rect
                            x="4"
                            y="18"
                            width="6"
                            height="10"
                            rx="2"
                            fill="white"
                            opacity="0.9"
                        />
                        <rect
                            x="13"
                            y="10"
                            width="6"
                            height="18"
                            rx="2"
                            fill="white"
                        />
                        <rect
                            x="22"
                            y="4"
                            width="6"
                            height="24"
                            rx="2"
                            fill="white"
                            opacity="0.7"
                        />
                    </svg>
                </div>

                {/* Brand */}
                <div className="text-center -mt-2">
                    <p className="text-[22px] font-medium text-[#2c2c2a] tracking-tight">
                        BuildGrid
                    </p>
                    <p className="text-[13px] text-[#888780] uppercase tracking-widest mt-0.5">
                        Mandi Management
                    </p>
                </div>

                {/* Wheat stalks */}
                <div className="flex items-end gap-2.5">
                    {[
                        { head: 22, stalk: 48, delay: "0s", color: "#b5891a" },
                        {
                            head: 18,
                            stalk: 38,
                            delay: "0.2s",
                            color: "#c49a22",
                        },
                        {
                            head: 26,
                            stalk: 54,
                            delay: "0.4s",
                            color: "#a67c15",
                        },
                        {
                            head: 20,
                            stalk: 44,
                            delay: "0.6s",
                            color: "#d4a82a",
                        },
                        {
                            head: 24,
                            stalk: 50,
                            delay: "0.8s",
                            color: "#b5891a",
                        },
                        {
                            head: 16,
                            stalk: 36,
                            delay: "1.0s",
                            color: "#c49a22",
                        },
                        {
                            head: 22,
                            stalk: 46,
                            delay: "0.3s",
                            color: "#a67c15",
                        },
                    ].map((s, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center gap-0.75 origin-bottom animate-[sway_2.8s_ease-in-out_infinite]"
                            style={{ animationDelay: s.delay }}
                        >
                            <div
                                className="w-3 rounded-[6px_6px_2px_2px] animate-[ripen_2.8s_ease-in-out_infinite]"
                                style={{
                                    height: s.head,
                                    background: s.color,
                                    animationDelay: s.delay,
                                }}
                            />
                            <div
                                className="w-0.75 rounded-sm bg-[#7a9e52]"
                                style={{ height: s.stalk }}
                            />
                        </div>
                    ))}
                </div>

                {/* Progress bar */}
                <div className="flex w-56 flex-col items-center gap-2.5 mt-4">
                    <div className="h-1 w-full overflow-hidden rounded-full bg-[#e0d8c8]">
                        <div className="h-full rounded-full bg-linear-to-r from-[#2d6a4f] to-[#52b788] animate-[load-bar_2.2s_ease-in-out_infinite]" />
                    </div>
                    <p className="text-[13px] text-[#888780] animate-[text-cycle_2.2s_ease-in-out_infinite]">
                        Loading your workspace
                        <span className="inline-flex gap-0.5 ml-0.5">
                            {["0s", "0.2s", "0.4s"].map((d, i) => (
                                <span
                                    key={i}
                                    className="inline-block text-[#b5891a] animate-[dot-bounce_1.4s_ease-in-out_infinite]"
                                    style={{ animationDelay: d }}
                                >
                                    .
                                </span>
                            ))}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
