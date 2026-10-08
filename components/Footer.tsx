import Link from "next/link";
import { Logo } from "@/components/Logo";
import { isStaticSite } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Logo size={30} />
            <p className="mt-4 text-sm leading-6 text-slate-500">
              The dedicated hiring network for hospitals, clinics, and the healthcare professionals who
              keep them moving.
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Platform</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {!isStaticSite && <li><Link href="/jobseeker/jobs" className="hover:text-brand-blue">Browse Jobs</Link></li>}
              <li><Link href="/jobseekers" className="hover:text-brand-blue">For Job Seekers</Link></li>
              <li><Link href="/employers" className="hover:text-brand-blue">For Employers</Link></li>
              <li><Link href="/pricing" className="hover:text-brand-blue">Pricing</Link></li>
              <li><Link href="/about" className="hover:text-brand-blue">About</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Account</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li><Link href="/auth/login" className="hover:text-brand-blue">Log in</Link></li>
              <li><Link href="/auth/register?role=jobseeker" className="hover:text-brand-blue">Job seeker sign up</Link></li>
              <li><Link href="/auth/register?role=employer" className="hover:text-brand-blue">Employer sign up</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Get started</p>
            <div className="mt-4 flex flex-col gap-3">
              <Link href="/auth/register?role=employer" className="btn-primary justify-center">
                Post a job
              </Link>
              <Link href="/auth/register?role=jobseeker" className="btn-secondary justify-center">
                Find a role
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-100 pt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} Aviut Healthcare. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
