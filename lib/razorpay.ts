import Razorpay from "razorpay";

let instance: Razorpay | null = null;

export function getRazorpay() {
  if (!instance) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      throw new Error(
        "Razorpay keys are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env"
      );
    }
    instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
  return instance;
}

export const PLAN_AMOUNTS = {
  EMPLOYER_SUBSCRIPTION: Number(process.env.EMPLOYER_PLAN_AMOUNT_PAISE ?? 99900),
  JOBSEEKER_GOLD: Number(process.env.GOLD_PLAN_AMOUNT_PAISE ?? 29900),
} as const;

export function formatRupees(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN")}`;
}
