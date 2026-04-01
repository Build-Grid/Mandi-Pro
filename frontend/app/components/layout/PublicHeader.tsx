import { Link, NavLink } from "react-router";

import { BRANDING } from "~/constants/branding";
import { APP_ROUTES } from "~/constants/routes";
import { PUBLIC_NAV_ITEMS } from "~/constants/navigation";

export function PublicHeader() {
    return (
        <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <Link
                    to={APP_ROUTES.landing}
                    className="text-lg font-bold tracking-tight text-slate-900"
                >
                    {BRANDING.applicationName}
                </Link>
                <nav className="flex items-center gap-2">
                    {PUBLIC_NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                                    isActive
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}
