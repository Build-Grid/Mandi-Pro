import { Outlet } from "react-router";

import { AppHeader } from "~/components/layout/AppHeader";
import { AppSidebar } from "~/components/layout/AppSidebar";

export default function AppShellLayout() {
    return (
        <div className="min-h-screen bg-slate-100">
            <AppHeader />
            <div className="mx-auto flex w-full max-w-[1600px]">
                <AppSidebar />
                <main className="min-h-[calc(100vh-65px)] flex-1 p-4 sm:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
