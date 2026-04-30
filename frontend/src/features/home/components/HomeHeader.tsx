import Link from "next/link";

import { navigationItems } from "@/features/home/home-content";
import Image from "next/image";

export function HomeHeader() {
    return (
        <header className="sticky top-0 z-30 border-b border-emerald-200/30 bg-linear-to-r from-white via-green-50/30 to-white/90 backdrop-blur supports-backdrop-filter:bg-white/70">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
                <Link
                    href="#top"
                    className="flex items-center gap-3 font-semibold tracking-tight text-emerald-900 transition duration-300 hover:opacity-80"
                >
                    <Image
                        src="/icons/mandipro.png"
                        alt="Mandi Pro logo"
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-md object-cover shadow-lg"
                    />
                    <span className="text-lg">Mandi Pro</span>
                </Link>

                <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-center md:gap-6">
                    {navigationItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-green-700 transition duration-300 hover:text-emerald-900"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center gap-3 self-start md:self-auto">
                    <Link
                        href="/login"
                        className="rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-emerald-50 motion-reduce:transform-none"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-full bg-linear-to-r from-amber-600 to-amber-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition duration-300 hover:-translate-y-0.5 hover:from-amber-700 hover:to-amber-800 motion-reduce:transform-none"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </header>
    );
}
