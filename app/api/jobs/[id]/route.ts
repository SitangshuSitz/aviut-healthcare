import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isGoldActive } from "@/lib/access";

const patchSchema = z.object({
  status: z.enum(["DRAFT", "OPEN", "CLOSED"]),
});

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  const job = await prisma.job.findUnique({
    where: { id: params.id },
    include: {
      employer: {
        select: {
          companyName: true,
          companyWebsite: true,
          contactPhone: true,
          user: { select: { email: true } },
        },
      },
    },
  });
  if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

  let canViewContact = false;
  if (session?.user?.role === "JOBSEEKER") {
    const seekerProfile = await prisma.jobSeekerProfile.findUnique({ where: { userId: session.user.id } });
    canViewContact = !!seekerProfile && isGoldActive(seekerProfile);
  }

  const { employer, ...rest } = job;
  return NextResponse.json({
    job: {
      ...rest,
      employer: {
        companyName: employer.companyName,
        companyWebsite: employer.companyWebsite,
        contactEmail: canViewContact ? employer.user.email : null,
        contactPhone: canViewContact ? employer.contactPhone : null,
      },
    },
    canViewContact,
  });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "EMPLOYER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const job = await prisma.job.findUnique({ where: { id: params.id }, include: { employer: true } });
  if (!job || job.employer.userId !== session.user.id) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const updated = await prisma.job.update({ where: { id: params.id }, data: { status: parsed.data.status } });
  return NextResponse.json({ job: updated });
}
