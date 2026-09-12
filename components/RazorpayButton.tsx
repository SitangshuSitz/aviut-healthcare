"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export function RazorpayButton({
  plan,
  label,
  className,
  userName,
  userEmail,
}: {
  plan: "EMPLOYER_SUBSCRIPTION" | "JOBSEEKER_GOLD";
  label: string;
  className?: string;
  userName: string;
  userEmail: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not start checkout");
        setLoading(false);
        return;
      }

      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Aviut Healthcare",
        description: plan === "EMPLOYER_SUBSCRIPTION" ? "Employer Subscription" : "Job Seeker Gold Membership",
        order_id: data.orderId,
        prefill: { name: userName, email: userEmail },
        theme: { color: "#2E6FB0" },
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/razorpay/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });
          if (verifyRes.ok) {
            router.refresh();
          } else {
            const d = await verifyRes.json();
            setError(d.error ?? "Payment verification failed");
          }
          setLoading(false);
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <button onClick={handlePay} disabled={loading} className={className}>
        {loading ? "Processing..." : label}
      </button>
      {error && <p className="mt-2 text-sm text-brand-red">{error}</p>}
    </>
  );
}
