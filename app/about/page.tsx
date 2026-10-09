import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Typewriter } from "@/components/Typewriter";
import { Reveal } from "@/components/Reveal";
import { EMPLOYER_PLANS, formatPrice, perPostPrice } from "@/lib/plans";

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
  { title: "Lower cost", body: "Flat plans with no bidding, per-click charges, or placement fees." },
  { title: "Easy dashboard", body: "Post roles and see every job and applicant in one place." },
  { title: "Applicant tracking", body: "Move candidates from applied to shortlisted to hired in one click." },
  { title: "Room to grow", body: "Quarterly and yearly plans include unlimited job posts." },
];

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
            A hiring network built only for{" "}
            <Typewriter words={["healthcare.", "hospitals.", "clinics.", "caregivers."]} className="text-[#f4c67b]" />
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

        <div className="mt-24">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Why Aviut</span>
              <h2 className="mt-4 font-serif text-3xl leading-tight text-brand-navy md:text-5xl">
                Costs less. Does more.
              </h2>
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

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_AVIUT.map((item) => (
              <Reveal key={item.title} className="h-full"><div className="card h-full">
                <h3 className="font-bold text-brand-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4c67b] px-4 py-16 text-center text-brand-navy">
        <h2 className="font-serif text-3xl md:text-4xl">Ready to see it in action?</h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/auth/register?role=employer" className="btn bg-brand-navy px-7 py-3 text-base text-white hover:bg-brand-blue">
            Post a job
          </Link>
          <Link href="/jobseekers" className="btn bg-white px-7 py-3 text-base text-brand-navy hover:bg-slate-100">
            Find a role
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
