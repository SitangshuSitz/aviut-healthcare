"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Logo } from "@/components/Logo";
import { Caduceus, RodOfAsclepius } from "@/components/MedicalEmblem";

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}

function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const initialRole = params.get("role") === "employer" ? "EMPLOYER" : "JOBSEEKER";

  const [role, setRole] = useState<"EMPLOYER" | "JOBSEEKER">(initialRole as "EMPLOYER" | "JOBSEEKER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, name, email, password, companyName, specialty }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        setLoading(false);
        return;
      }
      const signInRes = await signIn("credentials", { redirect: false, email, password });
      if (signInRes?.error) {
        setError("Account created. Please log in.");
        router.push("/auth/login");
        return;
      }
      router.push(role === "EMPLOYER" ? "/employer/dashboard" : "/jobseeker/dashboard");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-brand-bg px-4 py-12">
      <RodOfAsclepius className="pointer-events-none absolute -left-10 top-1/2 -z-10 hidden h-[80vh] -translate-y-1/2 -rotate-6 text-brand-navy opacity-[0.05] md:block" />
      <Caduceus className="pointer-events-none absolute -right-14 top-1/2 -z-10 hidden h-[80vh] -translate-y-1/2 rotate-6 text-brand-navy opacity-[0.05] md:block" />
      <div className="card w-full max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo size={38} />
        </div>
        <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => setRole("JOBSEEKER")}
            className={`rounded-md py-2 text-sm font-semibold ${
              role === "JOBSEEKER" ? "bg-white text-brand-navy shadow" : "text-slate-500"
            }`}
          >
            Job Seeker
          </button>
          <button
            type="button"
            onClick={() => setRole("EMPLOYER")}
            className={`rounded-md py-2 text-sm font-semibold ${
              role === "EMPLOYER" ? "bg-white text-brand-navy shadow" : "text-slate-500"
            }`}
          >
            Employer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">{role === "EMPLOYER" ? "Your Name" : "Full Name"}</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          {role === "EMPLOYER" && (
            <div>
              <label className="label">Company / Facility Name</label>
              <input
                className="input"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
          )}
          {role === "JOBSEEKER" && (
            <div>
              <label className="label">Specialty (optional)</label>
              <input
                className="input"
                placeholder="e.g. Registered Nurse"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
              />
            </div>
          )}
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
              minLength={8}
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-brand-red">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-2.5">
            {loading ? "Creating account..." : `Create ${role === "EMPLOYER" ? "Employer" : "Job Seeker"} Account`}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-brand-blue">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
