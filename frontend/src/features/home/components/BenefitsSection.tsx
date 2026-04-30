import { SectionHeading } from "@/features/home/components/SectionHeading";

export function BenefitsSection() {
  return (
    <section id="benefits" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Benefits"
        title="Advantages that translate into better user outcomes"
        description="This is where you connect the design back to business value in simple, outcome-focused language."
      />

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {[
          ["Faster decision-making", "Cards and sections help visitors understand the product quickly."],
          ["Better conversion flow", "Clear CTA placement reduces friction between reading and action."],
          ["Stronger brand trust", "Polished presentation signals maturity and attention to detail."],
        ].map(([title, description]) => (
          <article key={title} className="rounded-[1.75rem] border border-slate-200 bg-white/80 p-6 shadow-sm">
            <p className="text-lg font-semibold text-slate-950">{title}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}