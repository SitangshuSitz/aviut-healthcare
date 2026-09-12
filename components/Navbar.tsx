"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const { data: session, status } = useSession();
  const role = (session?.user as any)?.role as string | undefined;

  const dashboardHref =
    role === "EMPLOYER" ? "/employer/dashboard" : role === "JOBSEEKER" ? "/jobseeker/dashboard" : "/";

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/">
          <Logo size={34} />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/jobseeker/jobs" className="hover:text-brand-blue">
            Browse Jobs
          </Link>
          <Link href="/#pricing" className="hover:text-brand-blue">
            Pricing
          </Link>
          <Link href="/#employers" className="hover:text-brand-blue">
            For Employers
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          {status === "authenticated" ? (
            <>
              <Link href={dashboardHref} className="btn-secondary">
                Dashboard
              </Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn-secondary">
                Log in
              </Link>
              <Link href="/auth/register" className="btn-primary">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
