import { SectionHeading } from "@/features/home/components/SectionHeading";
import { faqs } from "@/features/home/home-content";
import { SubmitReview } from "@/features/home/components/SubmitReview";

export function FaqSection() {
    return (
        <section
            id="faq"
            className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        >
            <SectionHeading
                eyebrow="FAQ"
                title="Answers for mandi traders and agri businesses"
                description="Quick answers about trade tracking, ledgers, expenses, and daily profitability workflows."
            />

            <div className="mt-12 space-y-3">
                {faqs.map((faq, index) => (
                    <details
                        key={faq.question}
                        style={{
                            animationDelay: `${index * 40}ms`,
                        }}
                        className="group rounded-2xl border border-emerald-100 bg-linear-to-b from-emerald-50/40 to-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-200 open:shadow-md open:border-amber-200 open:bg-linear-to-b open:from-amber-50/30 open:to-white motion-safe:animate-fade-up motion-reduce:transform-none"
                    >
                        <summary className="flex cursor-pointer list-none items-center justify-between outline-none transition-all duration-300">
                            <span className="text-base font-semibold text-emerald-950 transition-colors duration-300 group-open:text-amber-900">
                                {faq.question}
                            </span>
                            <span className="ml-4 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-emerald-100 to-emerald-50 text-sm font-bold text-emerald-700 shadow-xs transition-all duration-500 ease-in-out group-open:bg-linear-to-br group-open:from-amber-200 group-open:to-amber-100 group-open:text-amber-700 group-open:rotate-45">
                                +
                            </span>
                        </summary>
                        <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-700 ease-in-out group-open:max-h-96 group-open:opacity-100">
                            <div className="pt-4 mt-4 border-t border-emerald-100/60 transition-colors duration-500 ease-in-out group-open:border-amber-100/60">
                                <p className="text-sm leading-7 text-green-800/80 transition-colors duration-500 ease-in-out group-open:text-amber-900/75">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    </details>
                ))}
            </div>

            <div className="mt-16">
                <SectionHeading
                    eyebrow="Review"
                    title="Share your Mandi-Pro experience"
                    description="Tell other traders how Mandi-Pro helped with trade tracking, finance, or daily reconciliation."
                />
                <SubmitReview />
            </div>
        </section>
    );
}
