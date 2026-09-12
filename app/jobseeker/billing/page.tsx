import { Navbar } from "@/components/Navbar";
import { requireJobSeeker, isGoldActive } from "@/lib/access";
import { formatRupees, PLAN_AMOUNTS } from "@/lib/razorpay";
import { RazorpayButton } from "@/components/RazorpayButton";

export default async function JobSeekerBillingPage() {
  const { user, profile } = await requireJobSeeker();
  const gold = isGoldActive(profile);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-2xl font-bold text-brand-navy">Gold Membership</h1>

        <div className="card mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-brand-navy">Membership Status</p>
              <p className="text-sm text-slate-500">
                {gold
                  ? `Gold active until ${profile.goldExpiresAt?.toLocaleDateString()}`
                  : "Free membership"}
              </p>
            </div>
            <span className={`badge ${gold ? "bg-brand-gold/15 text-brand-gold" : "bg-slate-100 text-slate-500"}`}>
              {gold ? "Gold" : "Free"}
            </span>
          </div>
        </div>

        <div className="card mt-6 border-2 border-brand-gold">
          <h2 className="font-semibold text-brand-gold">Gold Membership Plan</h2>
          <p className="mt-2 text-3xl font-extrabold text-brand-navy">
            {formatRupees(PLAN_AMOUNTS.JOBSEEKER_GOLD)}
            <span className="text-base font-medium text-slate-500">/month</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>✓ View employer contact emails directly on every job</li>
            <li>✓ Priority profile visibility to recruiters</li>
            <li>✓ Unlimited job alerts</li>
          </ul>
          <RazorpayButton
            plan="JOBSEEKER_GOLD"
            label={gold ? "Renew Gold Membership" : "Upgrade for ₹299/month"}
            className="btn-gold mt-6 w-full py-2.5"
            userName={user.name ?? ""}
            userEmail={user.email ?? ""}
          />
        </div>

        <p className="mt-4 text-xs text-slate-400">
          Payments are processed securely via Razorpay. This demo uses Razorpay test mode — no real
          charges occur unless live API keys are configured.
        </p>
      </div>
    </div>
  );
}
