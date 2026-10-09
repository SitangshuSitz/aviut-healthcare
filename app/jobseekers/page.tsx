import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { HeroEmblems } from "@/components/MedicalEmblem";
import { Footer } from "@/components/Footer";
import { Typewriter } from "@/components/Typewriter";
import { Reveal } from "@/components/Reveal";
import { RoleMarquee } from "@/components/RoleMarquee";
import { JOBSEEKER_GOLD_MONTHLY, JOBSEEKER_GOLD_YEARLY, formatPrice, goldYearlySaving } from "@/lib/plans";

const FEATURES = [
  { title: "Free to browse and apply", text: "Explore every open role and apply to as many as you like, at no cost." },
  { title: "Roles in your specialty", text: "Listings are organized by healthcare specialty, so you see openings that match your license." },
  { title: "Track every application", text: "See where each application stands without chasing emails or phone calls." },
  { title: "Apply directly to employers", text: "Hospitals and clinics hire on Aviut themselves, with no agency in the middle." },
];

const STEPS = [
  { step: "01", title: "Create your profile", text: "Add your specialty, experience, and the kind of shifts you want." },
  { step: "02", title: "Find the right role", text: "Browse openings from hospitals and clinics, filtered to your field." },
  { step: "03", title: "Apply and follow up", text: "Apply in a few clicks and track every application in one place." },
];

export default function JobSeekersPage() {
  const saving = goldYearlySaving();

  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <Navbar />

      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="hero-glow" />
        <div className="grid-overlay absolute inset-0" />
        <HeroEmblems />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center md:py-32">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4c67b]">For job seekers</span>
          <h1 className="mt-6 font-serif text-4xl leading-tight md:text-6xl">
            Find a role that fits your{" "}
            <Typewriter words={["specialty.", "schedule.", "skills.", "life."]} className="text-[#f4c67b]" />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Create a profile once, explore healthcare roles from hospitals and clinics, and keep every
            application organized. Browsing and applying are always free.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/auth/register?role=jobseeker" className="btn bg-brand-green px-6 py-3 text-base text-white hover:bg-[#4e8c4a]">
              Create free profile
            </Link>
            <Link href="/pricing/#jobseeker" className="group inline-flex px-2 py-3 text-base font-semibold text-white transition hover:text-[#f4c67b]">
              See Gold plans <span className="ml-1 inline-block transition group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      <RoleMarquee />

      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-green">Why Aviut</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-brand-navy md:text-5xl">A job search built around care work.</h2>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 100} className="h-full">
              <div className="card h-full border-t-4 border-t-brand-green">
                <h3 className="font-bold text-brand-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
          <Reveal className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-blue">How it works</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-brand-navy md:text-5xl">Three steps to your next role.</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <Reveal key={s.step} delay={i * 150}>
                <div className="group text-center">
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#e6eee9] font-serif text-2xl text-brand-green transition duration-300 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white">
                    {s.step}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-brand-navy">{s.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-600">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 md:py-24">
        <Reveal>
          <div className="hover-lift flex flex-col items-center justify-between gap-8 rounded-xl border-2 border-brand-gold bg-[#fffaf0] p-8 md:flex-row md:p-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">Gold membership</p>
              <h2 className="mt-3 font-serif text-3xl text-brand-navy">Stand out to employers.</h2>
              <p className="mt-3 max-w-lg leading-7 text-slate-600">
                Unlock employer contact emails, get priority visibility on your applications, and see new
                roles early.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-3xl font-bold text-brand-navy">
                {formatPrice(JOBSEEKER_GOLD_MONTHLY.price)}
                <span className="text-base font-medium text-slate-500"> / month</span>
              </p>
              <p className="mt-1 text-sm text-slate-600">
                or {formatPrice(JOBSEEKER_GOLD_YEARLY.price)} / year{" "}
                <span className="font-bold text-brand-green">(save {saving.percent}%)</span>
              </p>
              <Link href="/pricing/#jobseeker" className="btn-gold mt-5 px-6 py-3">
                Compare plans
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-brand-green px-4 py-16 text-center text-white">
        <Reveal>
          <h2 className="font-serif text-4xl md:text-5xl">Your next role is a profile away.</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-white/90">It takes a few minutes, and it&apos;s free.</p>
          <Link href="/auth/register?role=jobseeker" className="btn mt-8 bg-white px-7 py-3 text-base text-brand-navy hover:bg-slate-100">
            Get started free
          </Link>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
