"use client";

import Image from "next/image";

export function HomeFooter() {
    return (
        <footer className="bg-neutral-900 text-neutral-100">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/icons/mandipro.png"
                                alt="Mandi Pro"
                                width={40}
                                height={40}
                                className="rounded-md object-cover"
                            />
                            <div>
                                <div className="text-lg font-bold">
                                    Mandi Pro
                                </div>
                                <div className="text-sm text-neutral-300">
                                    Manage trades, margins, and operations with
                                    clarity.
                                </div>
                            </div>
                        </div>

                        <p className="max-w-sm text-sm text-neutral-400">
                            Mandi-Pro helps mandi businesses track purchases,
                            manage inventory, and optimize margins while keeping
                            farmer relationships central.
                        </p>

                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-800/60 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-200">
                            Trusted by 10K+ trades
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-semibold">Platform</h4>
                        <ul className="space-y-2 text-sm text-neutral-400">
                            <li>
                                <a href="#features" className="hover:underline">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="hover:underline">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#reviews" className="hover:underline">
                                    Insights
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-semibold">
                            Operations
                        </h4>
                        <ul className="space-y-2 text-sm text-neutral-400">
                            <li>Claims &amp; damages</li>
                            <li>Expense tracking (bora, labor)</li>
                            <li>Cashflow visibility</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-semibold">
                            Resources
                        </h4>
                        <ul className="space-y-2 text-sm text-neutral-400">
                            <li>
                                <a
                                    href="https://github.com/Build-Grid/Mandi-Pro/wiki"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:underline"
                                >
                                    Project Wiki
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-3 text-sm font-semibold">
                            Stay in touch
                        </h4>
                        <p className="text-sm text-neutral-400">
                            Get product updates and practical mandi tips.
                        </p>
                        <form
                            className="mt-3 flex w-full gap-2"
                            onSubmit={(e) => e.preventDefault()}
                        >
                            <input
                                aria-label="Email"
                                type="email"
                                placeholder="you@business.com"
                                className="w-full rounded-md border border-neutral-800 bg-neutral-800 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-500"
                            />
                            <button className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white">
                                Subscribe
                            </button>
                        </form>

                        <div className="mt-4 flex gap-3">
                            <a
                                href="mailto:thebuildgrid@gmail.com"
                                aria-label="email"
                                className="h-8 w-8 rounded-md bg-neutral-800 flex items-center justify-center hover:bg-neutral-700"
                            >
                                <svg
                                    className="h-4 w-4 text-neutral-200"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M2 4h20a2 2 0 0 1 2 2v.01L12 13 0 6.01V6a2 2 0 0 1 2-2zm22 4.236V18a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.236l11.447 6.674a1 1 0 0 0 1.106 0L24 8.236z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/atharva-sugandhi-391a4b225/"
                                aria-label="linkedin"
                                className="h-8 w-8 rounded-md bg-neutral-800 flex items-center justify-center hover:bg-neutral-700"
                            >
                                {" "}
                                <svg
                                    className="h-4 w-4 text-neutral-200"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4zM8.5 8h3.78v2.16h.05c.53-1 1.84-2.05 3.79-2.05 4.05 0 4.8 2.67 4.8 6.14V24h-4V15.4c0-2.06-.04-4.71-2.86-4.71-2.86 0-3.3 2.23-3.3 4.54V24h-4z" />
                                </svg>
                            </a>
                            <a
                                href="https://github.com/Build-Grid/Mandi-Pro"
                                aria-label="github"
                                className="h-8 w-8 rounded-md bg-neutral-800 flex items-center justify-center hover:bg-neutral-700"
                            >
                                {" "}
                                <svg
                                    className="h-4 w-4 text-neutral-200"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.33-1.3-1.68-1.3-1.68-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.76.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.44-2.71 5.41-5.29 5.69.42.36.8 1.08.8 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.2.67.8.56C20.71 21.4 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 border-t border-neutral-800 pt-4 text-sm text-neutral-400">
                    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <p>
                            © {new Date().getFullYear()} Mandi-Pro — Built for
                            mandi traders.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="/privacy" className="hover:underline">
                                Privacy
                            </a>
                            <a href="/terms" className="hover:underline">
                                Terms
                            </a>
                            <a href="/cookies" className="hover:underline">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
