import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { EMPLOYER_PLANS, formatPrice, perPostPrice } from "@/lib/plans";
import { Typewriter } from "@/components/Typewriter";
import { Reveal } from "@/components/Reveal";
import { RoleMarquee } from "@/components/RoleMarquee";

const STARTER = EMPLOYER_PLANS[0];

const COST_COMPARISON = [
  { platform: "Premium listing on a major Indian job portal", cost: "₹1,650 per job", perPost: "₹1,650" },
  { platform: "Pay-per-day sponsored job ads", cost: "From ~₹420 per day, per job", perPost: "₹12,000+ for a 30-day run" },
  { platform: "Promoted posts on professional networks", cost: "From ~₹600 per day, per job", perPost: "₹18,000+ for a 30-day run" },
  {
    platform: `Aviut ${STARTER.name}`,
    cost: `${formatPrice(STARTER.price)} / month for ${STARTER.postLimit} posts`,
    perPost: `About ${formatPrice(Math.round(perPostPrice(STARTER)!))}`,
    highlight: true,
  },
];

const WHY_AVIUT = [
  {
    title: "A fraction of the cost",
    body: "Flat monthly plans from ₹399 work out to roughly ₹25 a post on Starter and under ₹15 on Pro. No bidding, no per-click charges, no placement fees.",
  },
  {
    title: "Only healthcare candidates",
    body: "Every candidate on Aviut is looking for a healthcare role, from nurses and doctors to lab technicians and medical representatives.",
  },
  {
    title: "Simple hiring dashboard",
    body: "Post a role in minutes and see every job, applicant, and plan detail in one clean dashboard. No training needed.",
  },
  {
    title: "Track every applicant",
    body: "Move candidates from Applied to Shortlisted to Hired with one click, so your whole team knows where each hire stands.",
  },
  {
    title: "Unlimited options as you grow",
    body: "Hiring for a new wing or several branches? Quarterly and yearly plans include unlimited job posts.",
  },
  {
    title: "Secure, familiar payments",
    body: "Pay with UPI, cards, or net banking through Razorpay. Your plan goes live as soon as payment is confirmed.",
  },
];

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
            Hire faster for{" "}
            <Typewriter words={["nursing.", "your ICU.", "your clinic.", "every shift."]} className="text-[#f4c67b]" />
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

      <RoleMarquee />

      <section className="mx-auto max-w-6xl px-4 py-20 md:py-28">
        <div className="grid gap-6 md:grid-cols-3">
          <Reveal className="h-full"><div className="card h-full border-t-4 border-t-brand-red">
            <h3 className="font-bold text-brand-navy">Plans for every hiring pace</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              From 16 posts a month up to unlimited postings on quarterly and yearly plans.
            </p>
          </div></Reveal>
          <Reveal className="h-full"><div className="card h-full border-t-4 border-t-brand-red">
            <h3 className="font-bold text-brand-navy">Manage applicants in one place</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Review, shortlist, and update applicant status from a single dashboard.
            </p>
          </div></Reveal>
          <Reveal className="h-full"><div className="card h-full border-t-4 border-t-brand-red">
            <h3 className="font-bold text-brand-navy">Reach the right candidates</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Listings are organized by specialty so relevant candidates find your roles faster.
            </p>
          </div></Reveal>
        </div>

        <div className="mt-24">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Why Aviut</span>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-brand-navy md:text-5xl">
                Healthcare hiring that costs less and does more.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                General job boards charge per listing or per day and bury clinical roles among millions of
                others. Aviut is built only for healthcare, with flat monthly plans and everything you need
                to track every applicant.
              </p>
            </div>
          </Reveal>

          <Reveal><div className="mt-12 overflow-x-auto rounded-xl border border-brand-navy/10 bg-white">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-brand-navy/5 text-xs uppercase tracking-widest text-brand-navy/70">
                <tr>
                  <th className="px-6 py-4 font-bold">Platform type</th>
                  <th className="px-6 py-4 font-bold">Typical cost</th>
                  <th className="px-6 py-4 font-bold">Approx. cost per job post</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-navy/10 text-slate-600">
                {COST_COMPARISON.map((row) => (
                  <tr key={row.platform} className={row.highlight ? "bg-[#fdf3e3] font-semibold text-brand-navy" : ""}>
                    <td className="px-6 py-4">{row.platform}</td>
                    <td className="px-6 py-4">{row.cost}</td>
                    <td className="px-6 py-4">{row.perPost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div></Reveal>
          <p className="mt-3 text-xs text-slate-500">
            Based on publicly listed prices for India-based employers as of October 2026, before GST.
            Competitor prices vary by plan, role, and location.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_AVIUT.map((item) => (
              <Reveal key={item.title} className="h-full"><div className="card h-full">
                <h3 className="font-bold text-brand-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </div></Reveal>
            ))}
          </div>
        </div>

        <Reveal><div className="hover-lift mt-16 flex flex-col items-center justify-between gap-6 rounded-xl border border-brand-navy/10 bg-white p-8 md:flex-row">
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
        </div></Reveal>
      </section>

      <Footer />
    </div>
  );
}
