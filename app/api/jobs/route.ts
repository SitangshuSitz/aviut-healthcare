import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isSubscriptionActive } from "@/lib/access";

const schema = z.object({
  title: z.string().min(3),
  specialty: z.string().min(2),
  description: z.string().min(10),
  location: z.string().min(2),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "LOCUM", "PER_DIEM"]),
  salaryMin: z.number().int().nonnegative().optional(),
  salaryMax: z.number().int().nonnegative().optional(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const specialty = searchParams.get("specialty") ?? undefined;
  const location = searchParams.get("location") ?? undefined;

  const jobs = await prisma.job.findMany({
    where: {
      status: "OPEN",
      ...(specialty ? { specialty: { contains: specialty } } : {}),
      ...(location ? { location: { contains: location } } : {}),
    },
    include: { employer: { select: { companyName: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ jobs });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "EMPLOYER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.employerProfile.findUnique({ where: { userId: session.user.id } });
  if (!profile) return NextResponse.json({ error: "Employer profile not found" }, { status: 404 });

  if (!isSubscriptionActive(profile)) {
    return NextResponse.json(
      { error: "An active subscription is required to post jobs." },
      { status: 402 }
    );
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const job = await prisma.job.create({
    data: { ...parsed.data, employerId: profile.id },
  });

  return NextResponse.json({ job });
}
