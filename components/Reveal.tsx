"use client";

import { useEffect, useRef } from "react";

// Fades its content up into view the first time it scrolls on screen.
// Content is only hidden once this script runs, so it stays visible if JavaScript fails.
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Already on screen when the page loads: leave it as is
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.remove("reveal-pending");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
