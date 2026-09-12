import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <Navbar />

      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="hero-glow" />
        <div className="grid-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center md:py-32">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4c67b]">About Aviut</span>
          <h1 className="mt-6 font-serif text-4xl leading-tight md:text-6xl">
            A hiring network built only for healthcare.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Aviut connects hospitals and clinics with the nurses, allied health professionals, and care
            coordinators who keep them running &mdash; without the noise of a general-purpose job board.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 md:py-28">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">Why we exist</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-brand-navy">
              Healthcare hiring deserves a focused tool.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Generic job boards treat a shift nurse posting the same as a marketing internship. Aviut is
              built around the specifics of care work: licenses, specialties, shift patterns, and the
              urgency of keeping a care team fully staffed.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">How it works</p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-brand-navy">
              Simple on both sides of the hire.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Employers post roles and manage applicants from one dashboard. Job seekers create a profile
              once, browse relevant openings for free, and apply in a few clicks. No recruiters in the
              middle, no unrelated listings to filter out.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="card">
            <h3 className="font-bold text-brand-navy">Specialty-first</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Roles are organized by healthcare specialty, not generic job categories.
            </p>
          </div>
          <div className="card">
            <h3 className="font-bold text-brand-navy">Direct connections</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Employers and candidates communicate directly once a match is made &mdash; no middleman fees.
            </p>
          </div>
          <div className="card">
            <h3 className="font-bold text-brand-navy">Fair, transparent pricing</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Job seekers browse and apply for free. Employers pay one predictable monthly subscription.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f4c67b] px-4 py-16 text-center text-brand-navy">
        <h2 className="font-serif text-3xl md:text-4xl">Ready to see it in action?</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/auth/register?role=employer" className="btn bg-brand-navy px-7 py-3 text-base text-white hover:bg-brand-blue">
            Post a job
          </Link>
          <Link href="/jobseeker/jobs" className="btn bg-white px-7 py-3 text-base text-brand-navy hover:bg-slate-100">
            Browse open roles
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
