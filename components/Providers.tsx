"use client";

import { SessionProvider } from "next-auth/react";
import { isStaticSite } from "@/lib/site";

export function Providers({ children }: { children: React.ReactNode }) {
  if (isStaticSite) return <>{children}</>;
  return <SessionProvider>{children}</SessionProvider>;
}
