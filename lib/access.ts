import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function requireUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/auth/login");
  return session.user;
}

export async function requireEmployer() {
  const user = await requireUser();
  if (user.role !== "EMPLOYER") redirect("/");
  const profile = await prisma.employerProfile.findUnique({ where: { userId: user.id } });
  if (!profile) redirect("/auth/register?role=employer");
  return { user, profile };
}

export async function requireJobSeeker() {
  const user = await requireUser();
  if (user.role !== "JOBSEEKER") redirect("/");
  const profile = await prisma.jobSeekerProfile.findUnique({ where: { userId: user.id } });
  if (!profile) redirect("/auth/register?role=jobseeker");
  return { user, profile };
}

export function isSubscriptionActive(profile: { subscriptionStatus: string; subscriptionExpiresAt: Date | null }) {
  if (profile.subscriptionStatus !== "ACTIVE") return false;
  if (!profile.subscriptionExpiresAt) return false;
  return profile.subscriptionExpiresAt.getTime() > Date.now();
}

export function isGoldActive(profile: { isGold: boolean; goldExpiresAt: Date | null }) {
  if (!profile.isGold) return false;
  if (!profile.goldExpiresAt) return false;
  return profile.goldExpiresAt.getTime() > Date.now();
}
