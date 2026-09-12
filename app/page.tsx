import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LogoMark } from "@/components/Logo";
import { formatRupees, PLAN_AMOUNTS } from "@/lib/razorpay";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f5f0]">
      <Navbar />

      <section className="relative bg-brand-navy text-white">
        <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-brand-red md:block" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-[1.08fr_0.92fr] md:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f4c67b]"><span className="h-2 w-2 rounded-full bg-brand-red" /> Healthcare, connected</span>
            <h1 className="mt-6 font-serif text-5xl leading-[0.98] tracking-tight md:text-7xl">Better care starts with the right people.</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-200">Aviut is the dedicated hiring network for hospitals, clinics, and the healthcare professionals who keep them moving. Find trusted talent or your next meaningful role, all in one place.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/auth/register?role=employer" className="btn bg-brand-red px-6 py-3 text-base text-white hover:bg-[#c93730]">Build your team</Link>
              <Link href="/auth/register?role=jobseeker" className="inline-flex px-2 py-3 text-base font-semibold text-white underline decoration-[#f4c67b] decoration-2 underline-offset-8 hover:text-[#f4c67b]">Find your next role</Link>
            </div>
            <p className="mt-7 text-sm text-slate-300">Already part of Aviut? <Link href="/auth/login" className="font-bold text-white underline underline-offset-4">Log in to your account</Link></p>
          </div>
          <div className="relative z-10 md:pl-8">
            <div className="border border-white/20 bg-[#f7f5f0] p-5 text-brand-navy shadow-2xl md:-rotate-2 md:p-7">
              <div className="flex items-start justify-between border-b border-brand-navy/15 pb-5">
                <div className="flex items-center gap-3"><LogoMark size={42} /><div><p className="font-bold">The Aviut index</p><p className="text-xs text-slate-500">Healthcare talent, at a glance</p></div></div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Live</span>
              </div>
              <div className="grid grid-cols-2 gap-3 py-6"><div className="bg-[#e6eee9] p-4"><p className="text-3xl font-bold">2.3k</p><p className="mt-1 text-xs text-slate-600">open roles</p></div><div className="bg-[#f4e8dc] p-4"><p className="text-3xl font-bold">18k</p><p className="mt-1 text-xs text-slate-600">professionals</p></div></div>
              <div className="space-y-3 border-t border-brand-navy/15 pt-5 text-sm"><div className="flex items-center justify-between"><span>Registered Nurses</span><span className="font-bold text-brand-green">+24%</span></div><div className="flex items-center justify-between"><span>Allied Health</span><span className="font-bold text-brand-green">+18%</span></div><div className="flex items-center justify-between"><span>Care Coordinators</span><span className="font-bold text-brand-green">+12%</span></div></div>
            </div>
            <div className="absolute -bottom-6 -left-2 bg-[#f4c67b] px-5 py-3 text-sm font-bold text-brand-navy shadow-lg md:-left-4">Built for care teams</div>
          </div>
        </div>
      </section>

      <section className="border-b border-brand-navy/10 bg-[#f7f5f0]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 text-center md:grid-cols-4">
          <div><p className="text-3xl font-bold text-brand-navy">1,200+</p><p className="mt-1 text-xs uppercase tracking-widest text-slate-500">care facilities</p></div>
          <div><p className="text-3xl font-bold text-brand-navy">8</p><p className="mt-1 text-xs uppercase tracking-widest text-slate-500">specialty areas</p></div>
          <div><p className="text-3xl font-bold text-brand-navy">24/7</p><p className="mt-1 text-xs uppercase tracking-widest text-slate-500">career momentum</p></div>
          <div><p className="text-3xl font-bold text-brand-navy">100%</p><p className="mt-1 text-xs uppercase tracking-widest text-slate-500">healthcare focused</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">One network, two directions</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-brand-navy md:text-5xl">A platform that understands the work.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">From first application to first shift, Aviut brings the people and the places of care closer together.</p>
        </div>
        <div id="employers" className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="bg-brand-navy p-8 text-white md:p-10">
            <span className="text-sm font-bold uppercase tracking-widest text-[#f4c67b]">For employers</span>
            <h3 className="mt-5 text-3xl font-bold">Spend less time screening. More time caring.</h3>
            <p className="mt-4 leading-7 text-slate-300">Reach professionals by specialty, experience, and shift preference. Post roles, manage applicants, and build your next great care team from one focused dashboard.</p>
            <Link href="/auth/register?role=employer" className="mt-8 inline-flex font-bold text-white underline decoration-brand-red decoration-2 underline-offset-8">Start hiring</Link>
          </div>
          <div className="bg-[#e6eee9] p-8 text-brand-navy md:p-10">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-green">For professionals</span>
            <h3 className="mt-5 text-3xl font-bold">A role that fits your life and your license.</h3>
            <p className="mt-4 leading-7 text-slate-600">Create a profile once, explore relevant openings, and keep every application organized. Your next opportunity should feel like a step forward.</p>
            <Link href="/auth/register?role=jobseeker" className="mt-8 inline-flex font-bold text-brand-navy underline decoration-brand-red decoration-2 underline-offset-8">Explore opportunities</Link>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Simple by design</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-brand-navy md:text-5xl">Start where you are.</h2>
            <p className="mt-5 leading-7 text-slate-600">Job seekers can browse and apply for free. Employers get the tools to move from open role to great hire without the usual noise.</p>
          </div>
          <div className="grid gap-px bg-slate-200 sm:grid-cols-3">
            <div className="bg-white p-6"><p className="text-sm font-bold text-slate-500">Job seeker</p><p className="mt-3 text-3xl font-bold text-brand-navy">₹0</p><p className="mt-2 text-sm text-slate-500">Create, browse, apply</p></div>
            <div className="bg-[#fffaf0] p-6"><p className="text-sm font-bold text-brand-gold">Gold member</p><p className="mt-3 text-3xl font-bold text-brand-navy">{formatRupees(PLAN_AMOUNTS.JOBSEEKER_GOLD)}</p><p className="mt-2 text-sm text-slate-500">Priority visibility</p></div>
            <div className="bg-brand-navy p-6 text-white"><p className="text-sm font-bold text-[#f4c67b]">Employer</p><p className="mt-3 text-3xl font-bold">{formatRupees(PLAN_AMOUNTS.EMPLOYER_SUBSCRIPTION)}</p><p className="mt-2 text-sm text-slate-300">Unlimited hiring</p></div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4c67b] px-4 py-16 text-center text-brand-navy">
        <h2 className="font-serif text-4xl md:text-5xl">The right people are already looking.</h2>
        <p className="mx-auto mt-4 max-w-xl leading-7">Join the network built around the realities of healthcare work.</p>
        <Link href="/auth/register" className="btn mt-8 bg-brand-navy px-7 py-3 text-base text-white hover:bg-brand-blue">Create your account</Link>
      </section>

      <Footer />
    </div>
  );
}
