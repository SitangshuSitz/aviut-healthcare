import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { requireEmployer, isSubscriptionActive } from "@/lib/access";
import { prisma } from "@/lib/prisma";
import { ApplicationStatusSelect } from "@/components/ApplicationStatusSelect";

export default async function EmployerJobDetail({ params }: { params: { id: string } }) {
  const { profile } = await requireEmployer();

  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job || job.employerId !== profile.id) notFound();

  const active = isSubscriptionActive(profile);

  const applications = active
    ? await prisma.application.findMany({
        where: { jobId: job.id },
        include: { jobSeeker: { include: { user: { select: { name: true, email: true } } } } },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link href="/employer/dashboard" className="text-sm text-brand-blue">
          ← Back to dashboard
        </Link>
        <div className="card mt-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold text-brand-navy">{job.title}</h1>
              <p className="text-sm text-slate-500">
                {job.specialty} · {job.location} · {job.employmentType.replace("_", " ")}
              </p>
            </div>
            <span className="badge bg-slate-100 text-slate-600">{job.status}</span>
          </div>
          <p className="mt-4 whitespace-pre-line text-sm text-slate-600">{job.description}</p>
        </div>

        <h2 className="mt-8 mb-4 text-lg font-semibold text-brand-navy">
          Applicants {active && `(${applications.length})`}
        </h2>

        {!active ? (
          <div className="card border-brand-gold/50 bg-brand-gold/5">
            <p className="font-semibold text-brand-navy">Subscription required</p>
            <p className="mt-1 text-sm text-slate-600">
              Subscribe for ₹999/month to view applicant names, contact details, and manage this job.
            </p>
            <Link href="/employer/billing" className="btn-primary mt-4 inline-flex">
              Subscribe Now
            </Link>
          </div>
        ) : applications.length === 0 ? (
          <div className="card text-sm text-slate-500">No applicants yet.</div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => (
              <div key={app.id} className="card">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-brand-navy">{app.jobSeeker.user.name}</p>
                    <p className="text-sm text-slate-500">{app.jobSeeker.user.email}</p>
                    {app.jobSeeker.specialty && (
                      <p className="text-xs text-slate-400">{app.jobSeeker.specialty}</p>
                    )}
                  </div>
                  <ApplicationStatusSelect applicationId={app.id} status={app.status} />
                </div>
                {app.coverNote && <p className="mt-3 text-sm text-slate-600">{app.coverNote}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
