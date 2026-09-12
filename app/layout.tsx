import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Aviut Healthcare — Healthcare Hiring Platform",
  description:
    "Aviut Healthcare connects hospitals and clinics with verified healthcare professionals. Post jobs, hire faster, and find your next healthcare role.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
