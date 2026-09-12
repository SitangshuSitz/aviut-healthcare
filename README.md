# Aviut Healthcare

A healthcare professional hiring platform (Zoho-style) built with Next.js, Prisma (SQLite), NextAuth, and Razorpay subscription billing.

## Features

- Separate **Employer** and **Job Seeker** login/signup
- Employers: post jobs, manage applicants, subscription-gated at **₹999/month**
- Job seekers: free browsing/applying, **Gold Membership** (₹299/month) unlocks employer contact emails and priority visibility
- Razorpay Checkout for subscription payments, with signature verification + webhook support

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` (already done) and fill in your Razorpay **test mode** keys from https://dashboard.razorpay.com/app/keys.
   Until real keys are set, everything except checkout works (you can still explore the app, post jobs, etc. by seeding an already-subscribed demo employer — see below).
3. Create the database and run migrations:
   ```
   npm run db:migrate
   ```
4. Seed demo data (creates a subscribed demo employer, a demo job seeker, and sample job postings):
   ```
   npm run db:seed
   ```
5. Start the dev server:
   ```
   npm run dev
   ```
   Visit http://localhost:3000

## Demo logins (after seeding)

- Employer: `employer@demo.com` / `password123` (already has an active subscription)
- Job Seeker: `jobseeker@demo.com` / `password123` (free tier — use the billing page to test the Razorpay Gold checkout)

## Notes

- Pricing and currency (INR) live in `.env` (`EMPLOYER_PLAN_AMOUNT_PAISE`, `GOLD_PLAN_AMOUNT_PAISE`) and `lib/razorpay.ts`.
- Subscriptions are simple 30-day terms activated on successful payment (`app/api/razorpay/verify`), with a webhook fallback at `app/api/razorpay/webhook` for production reliability.
- The logo in `components/Logo.tsx` is an original SVG recreation inspired by the provided reference image (heart + cross mark, "AVIUT Healthcare" wordmark) — swap it for real brand assets whenever you have them.
- Switch `DATABASE_URL` in `.env` to a Postgres connection string and update `provider` in `prisma/schema.prisma` if you outgrow SQLite.
