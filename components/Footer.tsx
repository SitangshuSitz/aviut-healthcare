import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Logo size={30} />
          <p>© {new Date().getFullYear()} Aviut Healthcare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
