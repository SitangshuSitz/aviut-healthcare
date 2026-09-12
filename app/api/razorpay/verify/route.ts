import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import crypto from "crypto";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  razorpay_order_id: z.string(),
  razorpay_payment_id: z.string(),
  razorpay_signature: z.string(),
});

const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;

  const payment = await prisma.payment.findFirst({
    where: { razorpayOrderId: razorpay_order_id, userId: session.user.id },
  });
  if (!payment) return NextResponse.json({ error: "Order not found" }, { status: 404 });

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET ?? "")
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    await prisma.payment.update({ where: { id: payment.id }, data: { status: "FAILED" } });
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  await prisma.payment.update({
    where: { id: payment.id },
    data: { status: "PAID", razorpayPaymentId: razorpay_payment_id },
  });

  const expiresAt = new Date(Date.now() + ONE_MONTH_MS);

  if (payment.type === "EMPLOYER_SUBSCRIPTION") {
    await prisma.employerProfile.update({
      where: { userId: session.user.id },
      data: { subscriptionStatus: "ACTIVE", subscriptionExpiresAt: expiresAt },
    });
  } else {
    await prisma.jobSeekerProfile.update({
      where: { userId: session.user.id },
      data: { isGold: true, goldExpiresAt: expiresAt },
    });
  }

  return NextResponse.json({ success: true, expiresAt });
}
