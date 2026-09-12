import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isSubscriptionActive } from "@/lib/access";

const schema = z.object({
  coverNote: z.string().max(2000).optional(),
});

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "JOBSEEKER") {
    return NextResponse.json({ error: "Only job seekers can apply" }, { status: 401 });
  }

  const seekerProfile = await prisma.jobSeekerProfile.findUnique({ where: { userId: session.user.id } });
  if (!seekerProfile) return NextResponse.json({ error: "Complete your profile first" }, { status: 404 });

  const job = await prisma.job.findUnique({ where: { id: params.id } });
  if (!job || job.status !== "OPEN") {
    return NextResponse.json({ error: "This job is not accepting applications" }, { status: 404 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const existing = await prisma.application.findUnique({
    where: { jobId_jobSeekerId: { jobId: job.id, jobSeekerId: seekerProfile.id } },
  });
  if (existing) return NextResponse.json({ error: "You already applied to this job" }, { status: 409 });

  const application = await prisma.application.create({
    data: { jobId: job.id, jobSeekerId: seekerProfile.id, coverNote: parsed.data.coverNote },
  });

  return NextResponse.json({ application });
}

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "EMPLOYER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const job = await prisma.job.findUnique({ where: { id: params.id }, include: { employer: true } });
  if (!job || job.employer.userId !== session.user.id) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (!isSubscriptionActive(job.employer)) {
    return NextResponse.json({ error: "An active subscription is required to view applicants." }, { status: 402 });
  }

  const applications = await prisma.application.findMany({
    where: { jobId: job.id },
    include: {
      jobSeeker: {
        include: { user: { select: { name: true, email: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ applications });
}
