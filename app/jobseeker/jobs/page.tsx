"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

type Job = {
  id: string;
  title: string;
  specialty: string;
  location: string;
  employmentType: string;
  salaryMin: number | null;
  salaryMax: number | null;
  employer: { companyName: string };
};

export default function BrowseJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [specialty, setSpecialty] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const params = new URLSearchParams();
    if (specialty) params.set("specialty", specialty);
    if (location) params.set("location", location);
    const res = await fetch(`/api/jobs?${params.toString()}`);
    const data = await res.json();
    setJobs(data.jobs ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold text-brand-navy">Browse Healthcare Jobs</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            load();
          }}
          className="card mt-4 flex flex-wrap gap-3"
        >
          <input
            className="input flex-1"
            placeholder="Specialty (e.g. Nurse)"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
          />
          <input
            className="input flex-1"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit" className="btn-primary">
            Search
          </button>
        </form>

        <div className="mt-6 space-y-3">
          {loading ? (
            <p className="text-sm text-slate-500">Loading jobs...</p>
          ) : jobs.length === 0 ? (
            <div className="card text-sm text-slate-500">No jobs match your search.</div>
          ) : (
            jobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`} className="card flex items-center justify-between hover:border-brand-blue">
                <div>
                  <p className="font-semibold text-brand-navy">{job.title}</p>
                  <p className="text-sm text-slate-500">
                    {job.employer.companyName} · {job.specialty} · {job.location}
                  </p>
                </div>
                <div className="text-right text-sm">
                  <span className="badge bg-slate-100 text-slate-600">
                    {job.employmentType.replace("_", " ")}
                  </span>
                  {job.salaryMin && job.salaryMax && (
                    <p className="mt-1 text-xs text-slate-400">
                      ₹{job.salaryMin.toLocaleString("en-IN")} - ₹{job.salaryMax.toLocaleString("en-IN")}/mo
                    </p>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
