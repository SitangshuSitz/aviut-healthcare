import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { isStaticSite } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f7f5f0]">
      <Navbar />
      <section className="mx-auto max-w-2xl px-4 py-28 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">
          {isStaticSite ? "Launching soon" : "Page not found"}
        </p>
        <h1 className="mt-4 font-serif text-4xl leading-tight text-brand-navy md:text-5xl">
          {isStaticSite ? "Accounts are opening shortly." : "We couldn't find that page."}
        </h1>
        <p className="mt-5 leading-7 text-slate-600">
          {isStaticSite
            ? "Employer and job seeker sign-ups aren't live yet. Check back soon to post jobs or find your next role."
            : "The page you're looking for doesn't exist or has moved."}
        </p>
        <Link href="/" className="btn-primary mt-8">
          Back to home
        </Link>
      </section>
      <Footer />
    </div>
  );
}
