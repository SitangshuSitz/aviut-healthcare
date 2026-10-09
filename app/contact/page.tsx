import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { SUPPORT_EMAIL } from "@/lib/site";

const TOPICS = [
  { title: "Employers", body: "Posting jobs, plans, or managing applicants.", subject: "Employer enquiry" },
  { title: "Job seekers", body: "Your profile, applications, or Gold membership.", subject: "Job seeker enquiry" },
  { title: "Billing", body: "Payments, invoices, or refunds.", subject: "Billing enquiry" },
];

function mailto(subject: string) {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <Navbar />

      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="hero-glow" />
        <div className="grid-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center md:py-28">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#f4c67b]">Contact us</span>
          <h1 className="mt-6 font-serif text-4xl leading-tight md:text-6xl">We&rsquo;re here to help.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Questions, feedback, or need a hand? Email us and our team will get back to you.
          </p>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="btn mt-9 bg-brand-red px-6 py-3 text-base text-white hover:bg-[#c93730]"
          >
            {SUPPORT_EMAIL}
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 md:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {TOPICS.map((topic) => (
            <Reveal key={topic.title} className="h-full"><div className="card flex h-full flex-col border-t-4 border-t-brand-red">
              <h3 className="font-bold text-brand-navy">{topic.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{topic.body}</p>
              <a href={mailto(topic.subject)} className="mt-5 text-sm font-semibold text-brand-red hover:underline">
                Email support &rarr;
              </a>
            </div></Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
