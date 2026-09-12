import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { requireJobSeeker, isGoldActive } from "@/lib/access";
import { prisma } from "@/lib/prisma";

export default async function JobSeekerDashboard() {
  const { user, profile } = await requireJobSeeker();
  const gold = isGoldActive(profile);

  const applications = await prisma.application.findMany({
    where: { jobSeekerId: profile.id },
    include: { job: { include: { employer: { select: { companyName: true } } } } },
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">
              Welcome, {user.name}
              {gold && <span className="badge ml-2 bg-brand-gold/15 text-brand-gold">Gold Member</span>}
            </h1>
            <p className="text-sm text-slate-500">Job seeker dashboard</p>
          </div>
          <div className="flex gap-3">
            <Link href="/jobseeker/jobs" className="btn-primary">
              Browse Jobs
            </Link>
            {!gold && (
              <Link href="/jobseeker/billing" className="btn-gold">
                Go Gold
              </Link>
            )}
          </div>
        </div>

        {!gold && (
          <div className="mt-6 card border-brand-gold/50 bg-brand-gold/5">
            <p className="font-semibold text-brand-navy">Unlock Gold Membership — ₹299/month</p>
            <p className="mt-1 text-sm text-slate-600">
              See employer contact emails directly, get priority visibility, and unlimited job alerts.
            </p>
            <Link href="/jobseeker/billing" className="btn-gold mt-4 inline-flex">
              Upgrade Now
            </Link>
          </div>
        )}

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-brand-navy">Recent Applications</h2>
            <Link href="/jobseeker/applications" className="text-sm text-brand-blue">
              View all
            </Link>
          </div>
          {applications.length === 0 ? (
            <div className="card mt-4 text-sm text-slate-500">
              You haven&apos;t applied to any jobs yet.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {applications.map((app) => (
                <div key={app.id} className="card flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-brand-navy">{app.job.title}</p>
                    <p className="text-sm text-slate-500">{app.job.employer.companyName}</p>
                  </div>
                  <span className="badge bg-slate-100 text-slate-600">{app.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
