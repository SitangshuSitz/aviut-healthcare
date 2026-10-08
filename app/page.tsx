import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LogoMark } from "@/components/Logo";
import { Typewriter } from "@/components/Typewriter";
import { Reveal } from "@/components/Reveal";
import { RoleMarquee } from "@/components/RoleMarquee";
import { EMPLOYER_PLANS, JOBSEEKER_GOLD_MONTHLY, formatPrice } from "@/lib/plans";

const HERO_WORDS = ["people.", "nurses.", "doctors.", "care teams.", "specialists."];

const HOW_IT_WORKS = [
  { step: "01", title: "Create your profile", text: "Employers set up their facility. Professionals add their specialty and experience." },
  { step: "02", title: "Post or explore roles", text: "Employers publish openings by specialty. Professionals browse and apply for free." },
  { step: "03", title: "Connect and hire", text: "Review applicants, update their status, and reach the right people directly." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f5f0]">
      <Navbar />

      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="hero-glow" />
        <div className="grid-overlay absolute inset-0" />
        <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-brand-red/90 md:block" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-[1.08fr_0.92fr] md:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f4c67b]"><span className="h-2 w-2 animate-pulse rounded-full bg-brand-red" /> Healthcare, connected</span>
            <h1 className="mt-6 font-serif text-5xl leading-[0.98] tracking-tight md:text-7xl">
              Better care starts with the right{" "}
              <Typewriter words={HERO_WORDS} className="text-[#f4c67b]" />
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-200">Aviut is the dedicated hiring network for hospitals, clinics, and the healthcare professionals who keep them moving. Find trusted talent or your next meaningful role, all in one place.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/auth/register?role=employer" className="btn bg-brand-red px-6 py-3 text-base text-white hover:bg-[#c93730]">Build your team</Link>
              <Link href="/jobseekers" className="inline-flex px-2 py-3 text-base font-semibold text-white underline decoration-[#f4c67b] decoration-2 underline-offset-8 transition hover:text-[#f4c67b]">Find your next role</Link>
            </div>
          </div>
          <div className="relative z-10 md:pl-8">
            <div className="float-slow">
              <div className="border border-white/20 bg-[#f7f5f0] p-5 text-brand-navy shadow-2xl transition duration-500 hover:rotate-0 md:-rotate-2 md:p-7">
                <div className="flex items-center gap-3 border-b border-brand-navy/15 pb-5">
                  <LogoMark size={42} />
                  <div><p className="font-bold">How Aviut works</p><p className="text-xs text-slate-500">Three steps from opening to hire</p></div>
                </div>
                <ol className="space-y-4 pt-5">
                  {HOW_IT_WORKS.map((s) => (
                    <li key={s.step} className="group flex gap-4 rounded-lg p-2 transition hover:bg-white">
                      <span className="font-serif text-2xl text-brand-red transition group-hover:scale-110">{s.step}</span>
                      <div><p className="font-bold">{s.title}</p><p className="mt-1 text-sm leading-6 text-slate-600">{s.text}</p></div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-2 bg-[#f4c67b] px-5 py-3 text-sm font-bold text-brand-navy shadow-lg md:-left-4">Built for care teams</div>
          </div>
        </div>
      </section>

      <RoleMarquee />

      <section className="border-b border-brand-navy/10 bg-[#f7f5f0]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-10 text-center md:grid-cols-4">
          <Reveal><p className="text-3xl font-bold text-brand-navy">₹0</p><p className="mt-1 text-xs uppercase tracking-widest text-slate-500">to browse and apply</p></Reveal>
          <Reveal delay={100}><p className="text-3xl font-bold text-brand-navy">{formatPrice(EMPLOYER_PLANS[0].price)}</p><p className="mt-1 text-xs uppercase tracking-widest text-slate-500">employer plans from / month</p></Reveal>
          <Reveal delay={200}><p className="text-3xl font-bold text-brand-navy">Direct</p><p className="mt-1 text-xs uppercase tracking-widest text-slate-500">no recruiter middlemen</p></Reveal>
          <Reveal delay={300}><p className="text-3xl font-bold text-brand-navy">100%</p><p className="mt-1 text-xs uppercase tracking-widest text-slate-500">healthcare focused</p></Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">One network, two directions</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-brand-navy md:text-5xl">A platform that understands the work.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">From first application to first shift, Aviut brings the people and the places of care closer together.</p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="hover-lift h-full bg-brand-navy p-8 text-white md:p-10">
              <span className="text-sm font-bold uppercase tracking-widest text-[#f4c67b]">For employers</span>
              <h3 className="mt-5 text-3xl font-bold">Spend less time screening. More time caring.</h3>
              <p className="mt-4 leading-7 text-slate-300">Reach professionals by specialty, experience, and shift preference. Post roles, manage applicants, and build your next great care team from one focused dashboard.</p>
              <div className="mt-8 flex flex-wrap gap-6">
                <Link href="/auth/register?role=employer" className="font-bold text-white underline decoration-brand-red decoration-2 underline-offset-8">Start hiring</Link>
                <Link href="/employers" className="group font-bold text-[#f4c67b]">Learn more <span className="inline-block transition group-hover:translate-x-1">→</span></Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="hover-lift h-full bg-[#e6eee9] p-8 text-brand-navy md:p-10">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-green">For professionals</span>
              <h3 className="mt-5 text-3xl font-bold">A role that fits your life and your license.</h3>
              <p className="mt-4 leading-7 text-slate-600">Create a profile once, explore relevant openings, and keep every application organized. Your next opportunity should feel like a step forward.</p>
              <div className="mt-8 flex flex-wrap gap-6">
                <Link href="/auth/register?role=jobseeker" className="font-bold text-brand-navy underline decoration-brand-red decoration-2 underline-offset-8">Explore opportunities</Link>
                <Link href="/jobseekers" className="group font-bold text-brand-green">Learn more <span className="inline-block transition group-hover:translate-x-1">→</span></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-[0.9fr_1.1fr] md:py-24">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">Simple by design</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-brand-navy md:text-5xl">Start where you are.</h2>
            <p className="mt-5 leading-7 text-slate-600">Job seekers can browse and apply for free. Employers get the tools to move from open role to great hire without the usual noise.</p>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="hover-lift bg-[#f7f5f0] p-6"><p className="text-sm font-bold text-slate-500">Job seeker</p><p className="mt-3 text-3xl font-bold text-brand-navy">₹0</p><p className="mt-2 text-sm text-slate-500">Create, browse, apply</p></div>
              <div className="hover-lift bg-[#fffaf0] p-6"><p className="text-sm font-bold text-brand-gold">Gold member</p><p className="mt-2 text-xs text-slate-500">From</p><p className="text-3xl font-bold text-brand-navy">{formatPrice(JOBSEEKER_GOLD_MONTHLY.price)}</p><p className="mt-2 text-sm text-slate-500">Per month, priority visibility</p></div>
              <div className="hover-lift bg-brand-navy p-6 text-white"><p className="text-sm font-bold text-[#f4c67b]">Employer</p><p className="mt-2 text-xs text-slate-300">From</p><p className="text-3xl font-bold">{formatPrice(EMPLOYER_PLANS[0].price)}</p><p className="mt-2 text-sm text-slate-300">Per month, {EMPLOYER_PLANS[0].posts.split(" / ")[0]}</p></div>
            </div>
          </Reveal>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-20 md:pb-24">
          <Link href="/pricing" className="group inline-flex font-bold text-brand-blue">See full pricing details <span className="ml-1 inline-block transition group-hover:translate-x-1">→</span></Link>
        </div>
      </section>

      <section className="bg-[#f4c67b] px-4 py-16 text-center text-brand-navy">
        <Reveal>
          <h2 className="font-serif text-4xl md:text-5xl">The right people are already looking.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7">Join the network built around the realities of healthcare work.</p>
          <Link href="/auth/register" className="btn mt-8 bg-brand-navy px-7 py-3 text-base text-white hover:bg-brand-blue">Create your account</Link>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
