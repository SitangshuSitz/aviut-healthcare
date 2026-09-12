import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

// Configure this URL in the Razorpay dashboard as a backup to client-side
// verification, in case the browser closes before /api/razorpay/verify runs.
export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature");
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!secret || !signature) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  if (expected !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "payment.captured") {
    const orderId = event.payload?.payment?.entity?.order_id;
    const paymentId = event.payload?.payment?.entity?.id;
    if (orderId) {
      const payment = await prisma.payment.findFirst({ where: { razorpayOrderId: orderId } });
      if (payment && payment.status !== "PAID") {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: "PAID", razorpayPaymentId: paymentId },
        });

        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        if (payment.type === "EMPLOYER_SUBSCRIPTION") {
          await prisma.employerProfile.updateMany({
            where: { userId: payment.userId },
            data: { subscriptionStatus: "ACTIVE", subscriptionExpiresAt: expiresAt },
          });
        } else {
          await prisma.jobSeekerProfile.updateMany({
            where: { userId: payment.userId },
            data: { isGold: true, goldExpiresAt: expiresAt },
          });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
