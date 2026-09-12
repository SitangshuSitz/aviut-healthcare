"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

type JobDetail = {
  id: string;
  title: string;
  specialty: string;
  location: string;
  employmentType: string;
  description: string;
  salaryMin: number | null;
  salaryMax: number | null;
  employer: {
    companyName: string;
    companyWebsite: string | null;
    contactEmail: string | null;
    contactPhone: string | null;
  };
};

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: session } = useSession();
  const [job, setJob] = useState<JobDetail | null>(null);
  const [canViewContact, setCanViewContact] = useState(false);
  const [applied, setApplied] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data.job);
        setCanViewContact(data.canViewContact);
      });
  }, [id]);

  async function handleApply() {
    setMessage(null);
    const res = await fetch(`/api/jobs/${id}/applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Could not apply");
      return;
    }
    setApplied(true);
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navbar />
        <p className="mx-auto max-w-3xl px-4 py-10 text-sm text-slate-500">Loading...</p>
      </div>
    );
  }

  const role = (session?.user as any)?.role;

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="card">
          <h1 className="text-2xl font-bold text-brand-navy">{job.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {job.employer.companyName} · {job.specialty} · {job.location} ·{" "}
            {job.employmentType.replace("_", " ")}
          </p>
          {job.salaryMin && job.salaryMax && (
            <p className="mt-2 text-sm font-semibold text-brand-blue">
              ₹{job.salaryMin.toLocaleString("en-IN")} - ₹{job.salaryMax.toLocaleString("en-IN")}/month
            </p>
          )}

          <p className="mt-6 whitespace-pre-line text-sm text-slate-600">{job.description}</p>

          <div className="mt-6 border-t border-slate-100 pt-4">
            <p className="text-sm font-semibold text-brand-navy">Employer Contact</p>
            {canViewContact ? (
              <div className="mt-1 text-sm text-slate-600">
                <p>Email: {job.employer.contactEmail}</p>
                {job.employer.contactPhone && <p>Phone: {job.employer.contactPhone}</p>}
              </div>
            ) : (
              <div className="mt-2 flex items-center justify-between rounded-lg bg-brand-gold/10 px-4 py-3">
                <p className="text-sm text-slate-600">
                  Upgrade to Gold Membership to view employer contact details directly.
                </p>
                <Link href="/jobseeker/billing" className="btn-gold">
                  Go Gold
                </Link>
              </div>
            )}
          </div>

          <div className="mt-6">
            {role === "JOBSEEKER" ? (
              applied ? (
                <p className="badge bg-brand-green/15 text-brand-green">Application submitted</p>
              ) : (
                <button onClick={handleApply} className="btn-primary px-6 py-2.5">
                  Apply Now
                </button>
              )
            ) : role === "EMPLOYER" ? (
              <p className="text-sm text-slate-500">Employers cannot apply to job postings.</p>
            ) : (
              <Link href="/auth/login" className="btn-primary px-6 py-2.5">
                Log in to Apply
              </Link>
            )}
            {message && <p className="mt-2 text-sm text-brand-red">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
