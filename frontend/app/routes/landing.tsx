import { Link } from "react-router";

import { PublicFooter } from "~/components/layout/PublicFooter";
import { PublicHeader } from "~/components/layout/PublicHeader";
import { LANDING_COPY } from "~/constants/content";
import { APP_ROUTES } from "~/constants/routes";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-emerald-50">
            <PublicHeader />
            <main className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
                <section className="space-y-5">
                    <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
                        {LANDING_COPY.badge}
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                        {LANDING_COPY.headline}
                    </h1>
                    <p className="text-base text-slate-600">
                        {LANDING_COPY.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            to={APP_ROUTES.authRegister}
                            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            {LANDING_COPY.primaryCta}
                        </Link>
                        <Link
                            to={APP_ROUTES.authLogin}
                            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            {LANDING_COPY.secondaryCta}
                        </Link>
                    </div>
                </section>

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-900">
                        {LANDING_COPY.benefitsTitle}
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm text-slate-600">
                        {LANDING_COPY.benefits.map((benefit) => (
                            <li key={benefit}>{benefit}</li>
                        ))}
                    </ul>
                </section>
            </main>
            <PublicFooter />
        </div>
    );
}
