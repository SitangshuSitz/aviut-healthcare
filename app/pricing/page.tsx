import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { formatRupees, PLAN_AMOUNTS } from "@/lib/razorpay";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <Navbar />

      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="hero-glow" />
        <div className="grid-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center md:py-28">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4c67b]">Simple by design</span>
          <h1 className="mt-6 font-serif text-4xl leading-tight md:text-6xl">Start where you are.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Job seekers can browse and apply for free. Employers get the tools to move from open role to
            great hire without the usual noise.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="card flex flex-col">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500">Job seeker</p>
            <p className="mt-4 text-4xl font-bold text-brand-navy">₹0</p>
            <p className="mt-1 text-sm text-slate-500">Free, forever</p>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-600">
              <li>Create a candidate profile</li>
              <li>Browse all open roles</li>
              <li>Apply to unlimited jobs</li>
              <li>Track application status</li>
            </ul>
            <Link href="/auth/register?role=jobseeker" className="btn-secondary mt-8 justify-center">
              Get started free
            </Link>
          </div>

          <div className="card flex flex-col border-2 border-brand-gold bg-[#fffaf0]">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">Gold member</p>
            <p className="mt-4 text-4xl font-bold text-brand-navy">{formatRupees(PLAN_AMOUNTS.JOBSEEKER_GOLD)}</p>
            <p className="mt-1 text-sm text-slate-500">per month</p>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-600">
              <li>Everything in free</li>
              <li>Unlock employer contact emails</li>
              <li>Priority visibility on applications</li>
              <li>Early access to new roles</li>
            </ul>
            <Link href="/auth/register?role=jobseeker" className="btn-gold mt-8 justify-center">
              Go Gold
            </Link>
          </div>

          <div className="card flex flex-col bg-brand-navy text-white">
            <p className="text-sm font-bold uppercase tracking-widest text-[#f4c67b]">Employer</p>
            <p className="mt-4 text-4xl font-bold">{formatRupees(PLAN_AMOUNTS.EMPLOYER_SUBSCRIPTION)}</p>
            <p className="mt-1 text-sm text-slate-300">per month</p>
            <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-300">
              <li>Unlimited job postings</li>
              <li>Full applicant management dashboard</li>
              <li>Reach specialty-matched candidates</li>
              <li>Cancel anytime</li>
            </ul>
            <Link
              href="/auth/register?role=employer"
              className="btn mt-8 justify-center bg-brand-red text-white hover:bg-[#c93730]"
            >
              Start hiring
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
