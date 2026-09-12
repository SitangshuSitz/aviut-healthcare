import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { requireEmployer, isSubscriptionActive } from "@/lib/access";
import { prisma } from "@/lib/prisma";

export default async function EmployerDashboard() {
  const { profile } = await requireEmployer();
  const active = isSubscriptionActive(profile);

  const jobs = await prisma.job.findMany({
    where: { employerId: profile.id },
    include: { _count: { select: { applications: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">{profile.companyName}</h1>
            <p className="text-sm text-slate-500">Employer dashboard</p>
          </div>
          <div className="flex gap-3">
            <Link href="/employer/billing" className="btn-secondary">
              Billing
            </Link>
            <Link
              href={active ? "/employer/jobs/new" : "/employer/billing"}
              className="btn-primary"
            >
              + Post a Job
            </Link>
          </div>
        </div>

        {!active && (
          <div className="mt-6 card border-brand-gold/50 bg-brand-gold/5">
            <p className="font-semibold text-brand-navy">Subscribe to start hiring</p>
            <p className="mt-1 text-sm text-slate-600">
              Your account doesn&apos;t have an active subscription yet. Subscribe for ₹999/month to post
              jobs and view applicant details.
            </p>
            <Link href="/employer/billing" className="btn-primary mt-4 inline-flex">
              Subscribe Now
            </Link>
          </div>
        )}

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-brand-navy">Your Job Postings</h2>
          {jobs.length === 0 ? (
            <div className="card text-sm text-slate-500">
              You haven&apos;t posted any jobs yet.
            </div>
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/employer/jobs/${job.id}`}
                  className="card flex items-center justify-between hover:border-brand-blue"
                >
                  <div>
                    <p className="font-semibold text-brand-navy">{job.title}</p>
                    <p className="text-sm text-slate-500">
                      {job.specialty} · {job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="badge bg-slate-100 text-slate-600">{job.status}</span>
                    <span className="font-semibold text-brand-blue">
                      {job._count.applications} applicant{job._count.applications === 1 ? "" : "s"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
