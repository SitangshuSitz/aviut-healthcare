// Decorative medical symbols used as translucent background watermarks.
// They draw in currentColor, so set color and opacity with Tailwind classes.

type EmblemProps = { className?: string };

// Single serpent winding up the staff, head resting near the top.
const SERPENT =
  "M50 182 C30 174 30 156 50 150 C70 144 70 126 50 120 C30 114 30 96 50 90 C70 84 70 66 50 60 C34 55 32 42 44 36";

// One of the caduceus' two serpents; the other is its mirror image.
const CADUCEUS_SERPENT =
  "M60 184 C38 176 38 158 60 152 C82 146 82 128 60 122 C38 116 38 98 60 92 C82 86 82 70 64 64 C50 60 44 52 50 46";

const WING =
  "M56 44 C44 30 26 22 4 22 C10 28 14 30 18 32 C12 34 8 37 6 41 C14 41 20 41 26 43 C21 46 17 50 15 54 C22 53 28 52 34 51 C31 54 29 57 28 61 C38 58 48 54 56 50 Z";

export function RodOfAsclepius({ className = "" }: EmblemProps) {
  return (
    <svg viewBox="0 0 100 200" className={className} fill="none" aria-hidden="true" focusable="false">
      <rect x="46" y="16" width="8" height="180" rx="4" fill="currentColor" />
      <circle cx="50" cy="16" r="7" fill="currentColor" />
      <path d={SERPENT} stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <path d="M50 182 C44 180 40 184 38 190" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="41" cy="35" rx="9" ry="6" transform="rotate(15 41 35)" fill="currentColor" />
    </svg>
  );
}

export function Caduceus({ className = "" }: EmblemProps) {
  return (
    <svg viewBox="0 0 120 200" className={className} fill="none" aria-hidden="true" focusable="false">
      <rect x="56" y="22" width="8" height="174" rx="4" fill="currentColor" />
      <circle cx="60" cy="18" r="8" fill="currentColor" />
      <path d={WING} fill="currentColor" />
      <path d={WING} fill="currentColor" transform="matrix(-1 0 0 1 120 0)" />
      <path d={CADUCEUS_SERPENT} stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      <path d={CADUCEUS_SERPENT} stroke="currentColor" strokeWidth="6" strokeLinecap="round" transform="matrix(-1 0 0 1 120 0)" />
      <ellipse cx="51" cy="44" rx="7" ry="5" transform="rotate(25 51 44)" fill="currentColor" />
      <ellipse cx="69" cy="44" rx="7" ry="5" transform="rotate(-25 69 44)" fill="currentColor" />
    </svg>
  );
}

// Paired watermark for the navy page heroes. Place before the hero's
// relative content wrapper so the content paints on top.
export function HeroEmblems() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden text-white md:block" aria-hidden="true">
      <RodOfAsclepius className="absolute -left-4 top-1/2 h-[110%] -translate-y-1/2 -rotate-6 opacity-[0.07]" />
      <Caduceus className="absolute -right-8 top-1/2 h-[110%] -translate-y-1/2 rotate-6 opacity-[0.07]" />
    </div>
  );
}
