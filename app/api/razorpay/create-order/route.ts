import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getRazorpay, PLAN_AMOUNTS } from "@/lib/razorpay";

const schema = z.object({
  plan: z.enum(["EMPLOYER_SUBSCRIPTION", "JOBSEEKER_GOLD"]),
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  const { plan } = parsed.data;

  if (plan === "EMPLOYER_SUBSCRIPTION" && session.user.role !== "EMPLOYER") {
    return NextResponse.json({ error: "Only employers can purchase this plan" }, { status: 403 });
  }
  if (plan === "JOBSEEKER_GOLD" && session.user.role !== "JOBSEEKER") {
    return NextResponse.json({ error: "Only job seekers can purchase this plan" }, { status: 403 });
  }

  const amount = PLAN_AMOUNTS[plan];

  const razorpay = getRazorpay();
  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: `${plan}_${session.user.id}_${Date.now()}`,
    notes: { userId: session.user.id, plan },
  });

  await prisma.payment.create({
    data: {
      userId: session.user.id,
      type: plan,
      amountPaise: amount,
      razorpayOrderId: order.id,
      status: "CREATED",
    },
  });

  return NextResponse.json({
    orderId: order.id,
    amount,
    currency: "INR",
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  });
}
