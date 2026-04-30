import { AboutSection } from "@/features/home/components/AboutSection";
import { BenefitsSection } from "@/features/home/components/BenefitsSection";
import { CtaSection } from "@/features/home/components/CtaSection";
import { FaqSection } from "@/features/home/components/FaqSection";
import { FeaturesSection } from "@/features/home/components/FeaturesSection";
import { HomeFooter } from "@/features/home/components/HomeFooter";
import { HomeHeader } from "@/features/home/components/HomeHeader";
import { HeroSection } from "@/features/home/components/HeroSection";
import { ReviewsSection } from "@/features/home/components/ReviewsSection";
import { TestimonialsSection } from "@/features/home/components/TestimonialsSection";

export default function Home() {
    return (
        <main className="bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(15,23,42,0.08),_transparent_25%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] text-slate-900">
            <HomeHeader />
            <HeroSection />
            <FeaturesSection />
            <TestimonialsSection />
            <AboutSection />
            <BenefitsSection />
            <ReviewsSection />
            <CtaSection />
            <FaqSection />
            <HomeFooter />
        </main>
    );
}
