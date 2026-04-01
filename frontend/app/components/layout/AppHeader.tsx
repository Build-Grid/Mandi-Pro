import { useState } from "react";
import { Link } from "react-router";

import { BRANDING } from "~/constants/branding";
import { NAVIGATION_COPY, PROFILE_MENU_ITEMS } from "~/constants/navigation";

function UserAvatarIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
            aria-hidden="true"
        >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c1.8-3.5 4.5-5.2 8-5.2S18.2 16.5 20 20" />
        </svg>
    );
}

export function AppHeader() {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 px-4 py-3 sm:px-6">
                <div className="order-2 flex justify-center sm:order-1">
                    <label className="sr-only" htmlFor="global-search">
                        {NAVIGATION_COPY.headerSearchLabel}
                    </label>
                    <input
                        id="global-search"
                        placeholder={NAVIGATION_COPY.headerSearchPlaceholder}
                        className="w-full max-w-xl rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 shadow-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-emerald-500"
                    />
                </div>

                <div className="order-1 flex items-center justify-end gap-3 sm:order-2">
                    <span className="text-sm font-semibold text-slate-700">
                        {BRANDING.applicationName}
                    </span>
                    <div className="relative">
                        <button
                            type="button"
                            className="flex items-center rounded-full border border-slate-300 p-2 text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
                            onClick={() =>
                                setIsProfileMenuOpen((current) => !current)
                            }
                            aria-haspopup="menu"
                            aria-expanded={isProfileMenuOpen}
                            aria-label={NAVIGATION_COPY.profileActionAriaLabel}
                        >
                            <UserAvatarIcon />
                        </button>

                        {isProfileMenuOpen && (
                            <div
                                className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
                                role="menu"
                            >
                                {PROFILE_MENU_ITEMS.map((item) => (
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100"
                                        role="menuitem"
                                        onClick={() =>
                                            setIsProfileMenuOpen(false)
                                        }
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
