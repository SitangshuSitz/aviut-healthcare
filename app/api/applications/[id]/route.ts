import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  status: z.enum(["APPLIED", "SHORTLISTED", "REJECTED", "HIRED"]),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "EMPLOYER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const application = await prisma.application.findUnique({
    where: { id: params.id },
    include: { job: { include: { employer: true } } },
  });
  if (!application || application.job.employer.userId !== session.user.id) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  const updated = await prisma.application.update({
    where: { id: params.id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json({ application: updated });
}
