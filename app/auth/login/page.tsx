"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Logo } from "@/components/Logo";
import { Caduceus, RodOfAsclepius } from "@/components/MedicalEmblem";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await signIn("credentials", { redirect: false, email, password });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
      return;
    }
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-brand-bg px-4 py-12">
      <RodOfAsclepius className="pointer-events-none absolute -left-10 top-1/2 -z-10 hidden h-[80vh] -translate-y-1/2 -rotate-6 text-brand-navy opacity-[0.05] md:block" />
      <Caduceus className="pointer-events-none absolute -right-14 top-1/2 -z-10 hidden h-[80vh] -translate-y-1/2 rotate-6 text-brand-navy opacity-[0.05] md:block" />
      <div className="card w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo size={38} />
        </div>
        <h1 className="mb-6 text-center text-lg font-bold text-brand-navy">Log in to your account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-brand-red">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          New here?{" "}
          <Link href="/auth/register" className="font-semibold text-brand-blue">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
