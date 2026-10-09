import { Navbar } from "@/components/Navbar";
import { HeroEmblems } from "@/components/MedicalEmblem";
import { Footer } from "@/components/Footer";
import { PricingPlans } from "@/components/PricingPlans";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <Navbar />

      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="hero-glow" />
        <div className="grid-overlay absolute inset-0" />
        <HeroEmblems />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center md:py-28">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4c67b]">Simple by design</span>
          <h1 className="mt-6 font-serif text-4xl leading-tight md:text-6xl">Start where you are.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Job seekers can browse and apply for free. Employers pick the plan that matches how many
            roles they need to fill.
          </p>
        </div>
      </section>

      <PricingPlans />

      <Footer />
    </div>
  );
}
