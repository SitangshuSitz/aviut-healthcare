import { Navbar } from "@/components/Navbar";
import { requireEmployer, isSubscriptionActive } from "@/lib/access";
import { formatRupees, PLAN_AMOUNTS } from "@/lib/razorpay";
import { RazorpayButton } from "@/components/RazorpayButton";

export default async function EmployerBillingPage() {
  const { user, profile } = await requireEmployer();
  const active = isSubscriptionActive(profile);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-10">
        <h1 className="text-2xl font-bold text-brand-navy">Employer Billing</h1>

        <div className="card mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-brand-navy">Subscription Status</p>
              <p className="text-sm text-slate-500">
                {active
                  ? `Active until ${profile.subscriptionExpiresAt?.toLocaleDateString()}`
                  : "No active subscription"}
              </p>
            </div>
            <span className={`badge ${active ? "bg-brand-green/15 text-brand-green" : "bg-slate-100 text-slate-500"}`}>
              {active ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="card mt-6">
          <h2 className="font-semibold text-brand-navy">Employer Plan</h2>
          <p className="mt-2 text-3xl font-extrabold text-brand-navy">
            {formatRupees(PLAN_AMOUNTS.EMPLOYER_SUBSCRIPTION)}
            <span className="text-base font-medium text-slate-500">/month</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>✓ Post unlimited healthcare job openings</li>
            <li>✓ View full applicant contact details</li>
            <li>✓ Applicant tracking &amp; status management</li>
          </ul>
          <RazorpayButton
            plan="EMPLOYER_SUBSCRIPTION"
            label={active ? "Renew Subscription" : "Subscribe for ₹999/month"}
            className="btn-primary mt-6 w-full py-2.5"
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
