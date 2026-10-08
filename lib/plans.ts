// Prices shown on the public site. Amounts are in rupees.

export const JOBSEEKER_GOLD_PLAN = { name: "Gold member", price: 2199, period: "per year" } as const;

export type EmployerPlan = {
  name: string;
  price: number;
  period: string;
  posts: string;
  postLimit?: number; // monthly post limit; unlimited plans leave this out
};

export const EMPLOYER_PLANS: readonly EmployerPlan[] = [
  { name: "Starter", price: 399, period: "per month", posts: "16 job posts / month", postLimit: 16 },
  { name: "Growth", price: 699, period: "per month", posts: "30 job posts / month", postLimit: 30 },
  { name: "Pro", price: 999, period: "per month", posts: "70 job posts / month", postLimit: 70 },
  { name: "Quarterly", price: 2199, period: "per quarter", posts: "Unlimited job posts" },
  { name: "Yearly", price: 12999, period: "per year", posts: "Unlimited job posts" },
];

// Limited plans are compared against the Starter plan's per-post rate.
const BASE_PLAN = EMPLOYER_PLANS[0];
const BASE_RATE = BASE_PLAN.price / BASE_PLAN.postLimit!;

export function perPostPrice(plan: EmployerPlan) {
  return plan.postLimit ? plan.price / plan.postLimit : null;
}

export function limitedPlanSaving(plan: EmployerPlan) {
  if (!plan.postLimit || plan === BASE_PLAN) return null;
  const regular = Math.round(plan.postLimit * BASE_RATE);
  const saved = regular - plan.price;
  if (saved <= 0) return null;
  return { regular, saved, percent: Math.round((saved / regular) * 100) };
}

export function formatPrice(rupees: number) {
  return `₹${rupees.toLocaleString("en-IN")}`;
}
