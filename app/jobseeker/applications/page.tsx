import { Navbar } from "@/components/Navbar";
import { requireJobSeeker } from "@/lib/access";
import { prisma } from "@/lib/prisma";

export default async function MyApplicationsPage() {
  const { profile } = await requireJobSeeker();

  const applications = await prisma.application.findMany({
    where: { jobSeekerId: profile.id },
    include: { job: { include: { employer: { select: { companyName: true } } } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold text-brand-navy">My Applications</h1>
        <div className="mt-6 space-y-3">
          {applications.length === 0 ? (
            <div className="card text-sm text-slate-500">No applications yet.</div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="card flex items-center justify-between">
                <div>
                  <p className="font-semibold text-brand-navy">{app.job.title}</p>
                  <p className="text-sm text-slate-500">{app.job.employer.companyName}</p>
                  <p className="text-xs text-slate-400">
                    Applied {app.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <span className="badge bg-slate-100 text-slate-600">{app.status}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
