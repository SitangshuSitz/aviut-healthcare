"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  EMPLOYER_PLANS,
  JOBSEEKER_GOLD_MONTHLY,
  JOBSEEKER_GOLD_YEARLY,
  goldYearlySaving,
  formatPrice,
  limitedPlanSaving,
  perPostPrice,
} from "@/lib/plans";

type Audience = "employer" | "jobseeker";

export function PricingPlans() {
  const [audience, setAudience] = useState<Audience>("employer");

  // /pricing#jobseeker opens the job seeker plans directly
  useEffect(() => {
    if (window.location.hash === "#jobseeker") setAudience("jobseeker");
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
      <div className="mx-auto flex w-fit rounded-full border border-brand-navy/15 bg-white p-1 shadow-sm">
        <button
          onClick={() => setAudience("employer")}
          className={`rounded-full px-5 py-2 text-sm font-bold transition ${
            audience === "employer" ? "bg-brand-navy text-white" : "text-slate-600 hover:text-brand-navy"
          }`}
        >
          For employers
        </button>
        <button
          onClick={() => setAudience("jobseeker")}
          className={`rounded-full px-5 py-2 text-sm font-bold transition ${
            audience === "jobseeker" ? "bg-brand-green text-white" : "text-slate-600 hover:text-brand-green"
          }`}
        >
          For job seekers
        </button>
      </div>

      {audience === "employer" ? <EmployerPlans /> : <JobSeekerPlans />}
    </section>
  );
}

function EmployerPlans() {
  return (
    <div className="mt-12">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">Employer plans</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-brand-navy md:text-4xl">Plans for every hiring pace.</h2>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {EMPLOYER_PLANS.map((plan) => {
          const saving = limitedPlanSaving(plan);
          const rate = perPostPrice(plan);
          return (
            <div key={plan.name} className="hover-lift relative flex flex-col overflow-hidden rounded-xl border border-brand-navy/10 bg-white shadow-sm">
              <div className="h-1.5 bg-brand-navy" />
              {saving && (
                <span className="absolute right-3 top-4 rounded-full bg-brand-green px-2.5 py-1 text-xs font-bold text-white">
                  Save {saving.percent}%
                </span>
              )}
              <div className="flex flex-1 flex-col p-6">
                <p className="text-sm font-bold uppercase tracking-widest text-slate-500">{plan.name}</p>
                <p className="mt-4 h-5 text-sm text-slate-400">
                  {saving && <span className="line-through">{formatPrice(saving.regular)}</span>}
                </p>
                <p className="text-3xl font-bold text-brand-navy">{formatPrice(plan.price)}</p>
                <p className="mt-1 text-sm text-slate-500">{plan.period}</p>
                <p className="mt-2 h-5 text-xs font-semibold text-brand-green">
                  {saving && `You save ${formatPrice(saving.saved)}`}
                </p>
                <p className="mt-5 text-sm font-semibold text-brand-navy">{plan.posts}</p>
                <p className="mt-1 text-xs text-slate-500">
                  {rate ? `₹${rate.toFixed(2)} per post` : "No posting limits"}
                </p>
                <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-600">
                  <li>Applicant management dashboard</li>
                  <li>Specialty-matched candidates</li>
                </ul>
                <Link
                  href="/auth/register?role=employer"
                  className="btn mt-8 justify-center bg-brand-red text-white hover:bg-[#c93730]"
                >
                  Start hiring
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs text-slate-500">
        Savings on Growth and Pro are compared with the Starter plan&apos;s per-post price.
      </p>
    </div>
  );
}

function JobSeekerPlans() {
  return (
    <div className="mt-12">
      <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-green">Job seeker plans</p>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-brand-navy md:text-4xl">Free to apply. Gold to stand out.</h2>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-3">
        <div className="hover-lift flex flex-col overflow-hidden rounded-xl border border-brand-green/20 bg-[#f1f6f3] shadow-sm">
          <div className="h-1.5 bg-brand-green" />
          <div className="flex flex-1 flex-col p-8">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-green">Free</p>
            <p className="mt-4 h-5" />
            <p className="text-4xl font-bold text-brand-navy">₹0</p>
            <p className="mt-1 text-sm text-slate-500">Free, forever</p>
            <p className="mt-2 h-5" />
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
        </div>

        <GoldCard plan={JOBSEEKER_GOLD_MONTHLY} />
        <GoldCard plan={JOBSEEKER_GOLD_YEARLY} saving={goldYearlySaving()} />
      </div>
    </div>
  );
}

function GoldCard({
  plan,
  saving,
}: {
  plan: { name: string; price: number; period: string };
  saving?: { regular: number; saved: number; percent: number };
}) {
  return (
    <div className="hover-lift relative flex flex-col overflow-hidden rounded-xl border-2 border-brand-gold bg-[#fffaf0] shadow-sm">
      <div className="h-1.5 bg-brand-gold" />
      {saving && (
        <span className="absolute right-4 top-5 rounded-full bg-brand-green px-2.5 py-1 text-xs font-bold text-white">
          Save {saving.percent}%
        </span>
      )}
      <div className="flex flex-1 flex-col p-8">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">{plan.name}</p>
        <p className="mt-4 h-5 text-sm text-slate-400">
          {saving && <span className="line-through">{formatPrice(saving.regular)}</span>}
        </p>
        <p className="text-4xl font-bold text-brand-navy">{formatPrice(plan.price)}</p>
        <p className="mt-1 text-sm text-slate-500">{plan.period}</p>
        <p className="mt-2 h-5 text-xs font-semibold text-brand-green">
          {saving && `You save ${formatPrice(saving.saved)} vs paying monthly`}
        </p>
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
    </div>
  );
}
