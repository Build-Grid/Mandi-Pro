import type { PropsWithChildren } from "react";

interface PageContainerProps extends PropsWithChildren {
    title: string;
    description: string;
}

export function PageContainer({
    title,
    description,
    children,
}: PageContainerProps) {
    return (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <header className="mb-6 border-b border-slate-100 pb-4">
                <h1 className="text-2xl font-semibold text-slate-900">
                    {title}
                </h1>
                <p className="mt-1 text-sm text-slate-600">{description}</p>
            </header>
            {children}
        </section>
    );
}
