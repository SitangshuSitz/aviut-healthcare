// Decorative medical symbols used as translucent background watermarks.
// They draw in currentColor, so set color and opacity with Tailwind classes.

type EmblemProps = { className?: string };

// Serpent head pointing along +x from its origin, with the eye cut out.
const HEAD =
  "M0 -5 C7 -9 18 -8 24 -3.5 C27.5 -1 27.5 2 24 3.5 C18 7 7 8 0 5 Z M18.6 -1.2 a2 2 0 1 0 -4 0 a2 2 0 1 0 4 0 Z";

// A serpent body is split into segments of decreasing stroke width so it
// tapers from the neck to the tail.
type Segment = { d: string; w: number };

function Serpent({ body, head, transform }: { body: Segment[]; head: string; transform?: string }) {
  return (
    <g transform={transform}>
      {body.map((s) => (
        <path key={s.d} d={s.d} stroke="currentColor" strokeWidth={s.w} strokeLinecap="round" />
      ))}
      <path d={HEAD} transform={head} fill="currentColor" fillRule="evenodd" />
    </g>
  );
}

// Staff that tapers to a point at the bottom.
function Staff({ cx, top }: { cx: number; top: number }) {
  return <path d={`M${cx - 4.5} ${top} H${cx + 4.5} V200 L${cx} 238 L${cx - 4.5} 200 Z`} fill="currentColor" />;
}

const ROD_SERPENT: Segment[] = [
  { d: "M62 40 C40 36 32 54 44 66 C54 76 74 82 72 100", w: 12 },
  { d: "M72 100 C70 118 40 116 36 132 C32 148 62 150 64 164", w: 10 },
  { d: "M64 164 C66 178 40 176 42 190", w: 7 },
  { d: "M42 190 C44 198 54 198 55 208", w: 4 },
];

export function RodOfAsclepius({ className = "" }: EmblemProps) {
  return (
    <svg viewBox="0 0 100 240" className={className} fill="none" aria-hidden="true" focusable="false">
      <Staff cx={50} top={22} />
      <rect x="43" y="12" width="14" height="11" rx="4" fill="currentColor" />
      <circle cx="50" cy="9" r="4.5" fill="currentColor" />
      <Serpent body={ROD_SERPENT} head="translate(58 40) rotate(-12)" />
    </svg>
  );
}

// Caduceus silhouette from public/caduceus.png (an alpha-only cut-out), used as a
// mask so it takes currentColor like the SVG symbols. Only use it on absolutely
// positioned elements with a height set; the width follows the aspect ratio.
const CADUCEUS_MASK = "url(/caduceus.png) center / contain no-repeat";

export function Caduceus({ className = "" }: EmblemProps) {
  return (
    <span
      aria-hidden="true"
      className={`bg-current ${className}`}
      style={{ aspectRatio: "590 / 510", mask: CADUCEUS_MASK, WebkitMask: CADUCEUS_MASK }}
    />
  );
}

// Paired watermark for the navy page heroes. Place before the hero's
// relative content wrapper so the content paints on top.
export function HeroEmblems() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden text-white md:block" aria-hidden="true">
      <RodOfAsclepius className="absolute -left-4 top-1/2 h-[110%] -translate-y-1/2 -rotate-6 opacity-[0.07]" />
      <Caduceus className="absolute -right-16 top-1/2 h-[90%] -translate-y-1/2 rotate-6 opacity-[0.07]" />
    </div>
  );
}
