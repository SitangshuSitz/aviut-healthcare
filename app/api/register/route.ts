import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  role: z.enum(["EMPLOYER", "JOBSEEKER"]),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  companyName: z.string().optional(),
  specialty: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  const { role, name, email, password, companyName, specialty } = parsed.data;

  if (role === "EMPLOYER" && !companyName) {
    return NextResponse.json({ error: "Company name is required" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      name,
      role,
      passwordHash,
      ...(role === "EMPLOYER"
        ? { employerProfile: { create: { companyName: companyName! } } }
        : { jobSeekerProfile: { create: { specialty } } }),
    },
  });

  return NextResponse.json({ id: user.id });
}
