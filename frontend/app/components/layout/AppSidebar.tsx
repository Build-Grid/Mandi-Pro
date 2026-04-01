import { NavLink } from "react-router";

import { APP_NAV_ITEMS, NAVIGATION_COPY } from "~/constants/navigation";

export function AppSidebar() {
    return (
        <aside className="hidden w-72 border-r border-slate-200 bg-white lg:block">
            <div className="border-b border-slate-200 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {NAVIGATION_COPY.sidebarTitle}
                </p>
            </div>
            <nav className="space-y-1 p-3">
                {APP_NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            `block rounded-lg px-3 py-2 text-sm font-medium transition ${
                                isActive
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
