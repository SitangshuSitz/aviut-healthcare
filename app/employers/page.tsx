import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EMPLOYER_PLANS, formatPrice } from "@/lib/plans";

export default function EmployersPage() {
  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <Navbar />

      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="hero-glow" />
        <div className="grid-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center md:py-32">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4c67b]">For employers</span>
          <h1 className="mt-6 font-serif text-4xl leading-tight md:text-6xl">
            Spend less time screening. More time caring.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Reach professionals by specialty, experience, and shift preference. Post roles, manage
            applicants, and build your next great care team from one focused dashboard.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/auth/register?role=employer" className="btn bg-brand-red px-6 py-3 text-base text-white hover:bg-[#c93730]">
              Start hiring
            </Link>
            <Link href="/pricing" className="inline-flex px-2 py-3 text-base font-semibold text-white underline decoration-[#f4c67b] decoration-2 underline-offset-8 hover:text-[#f4c67b]">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="card">
            <h3 className="font-bold text-brand-navy">Plans for every hiring pace</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              From 16 posts a month up to unlimited postings on quarterly and yearly plans.
            </p>
          </div>
          <div className="card">
            <h3 className="font-bold text-brand-navy">Manage applicants in one place</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review, shortlist, and update applicant status from a single dashboard.
            </p>
          </div>
          <div className="card">
            <h3 className="font-bold text-brand-navy">Reach the right candidates</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Listings are organized by specialty so relevant candidates find your roles faster.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-xl border border-brand-navy/10 bg-white p-8 md:flex-row">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">Employer plans</p>
            <p className="mt-2 text-3xl font-bold text-brand-navy">
              <span className="text-base font-medium text-slate-500">From </span>{formatPrice(EMPLOYER_PLANS[0].price)}
              <span className="text-base font-medium text-slate-500"> / month</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/auth/register?role=employer" className="btn-primary">
              Create employer account
            </Link>
            <Link href="/pricing" className="btn-secondary">
              Compare all plans
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
