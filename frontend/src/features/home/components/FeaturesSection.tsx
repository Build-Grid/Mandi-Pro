import { SectionHeading } from "@/features/home/components/SectionHeading";
import { features } from "@/features/home/home-content";

const iconPaths = {
    dashboard: (
        <path
            d="M4 6.5h16M4 12h8M4 17.5h12"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
    ),
    users: (
        <path
            d="M12 3.5a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm-7 14a7 7 0 0 1 14 0"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
    ),
    chart: (
        <path
            d="M5 17V8m5 9V4m5 13v-6"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
    ),
    device: (
        <path
            d="M7 4.5h10v15H7zM4.5 7.5h2M4.5 11h2M4.5 14.5h2"
            strokeWidth="1.8"
            strokeLinecap="round"
        />
    ),
} as const;

export function FeaturesSection() {
    return (
        <section
            id="features"
            className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
        >
            <SectionHeading
                eyebrow="Features"
                title="Everything you need to run mandi trades efficiently"
                description="From trade entries to ledgers and expenses, Mandi-Pro keeps business-critical operations in one place."
            />

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {features.map((feature, index) => (
                    <article
                        key={feature.title}
                        style={{ animationDelay: `${index * 80}ms` }}
                        className="group rounded-2xl border border-emerald-100 bg-linear-to-br from-white to-emerald-50/30 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-amber-200 motion-safe:animate-fade-up motion-reduce:transform-none"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-amber-600 to-emerald-700 text-white transition duration-300 group-hover:scale-110">
                            <svg
                                viewBox="0 0 24 24"
                                className="h-6 w-6 fill-none stroke-current"
                            >
                                {iconPaths[feature.icon]}
                            </svg>
                        </div>
                        <h3 className="mt-5 text-lg font-semibold text-emerald-950">
                            {feature.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-green-800">
                            {feature.description}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}
