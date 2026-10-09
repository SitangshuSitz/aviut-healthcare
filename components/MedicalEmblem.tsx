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

// Left wing: a solid arch rising from the staff and sweeping out to a pointed
// tip, with feathers hanging beneath it. Feathers point outward at the tip and
// turn steadily downward toward the staff. The right wing is its mirror image.
const WING_ARCH =
  "M100 42 C92 28 70 14 40 11 C24 10 12 12 3 16 C9 22 15 26 22 28 C40 32 64 38 84 50 C92 55 96 60 100 64 Z";

// Each feather is [origin x, origin y, angle in degrees (+ is upward), length].
const FEATHERS: [number, number, number, number][] = [
  [17, 25, -50, 22],
  [26, 28, -52, 30],
  [38, 32, -60, 34],
  [50, 36, -67, 36],
  [62, 41, -74, 34],
  [74, 47, -81, 30],
  [86, 54, -88, 20],
];

function Wing({ transform }: { transform?: string }) {
  return (
    <g transform={transform} fill="currentColor">
      <path d={WING_ARCH} />
      {FEATHERS.map(([x, y, angle, len]) => (
        <path
          key={`${x}-${y}`}
          d={`M0 -7.5 C${-len * 0.6} -8.5 ${-len * 0.9} -4 ${-len} 0 C${-len * 0.9} 4 ${-len * 0.6} 8.5 0 7.5 Z`}
          transform={`translate(${x} ${y}) rotate(${angle})`}
        />
      ))}
    </g>
  );
}

// One of the two intertwined serpents; the other is its mirror image.
const CADUCEUS_SERPENT: Segment[] = [
  { d: "M80 84 C64 88 68 104 100 112 C130 120 132 134 100 142", w: 11 },
  { d: "M100 142 C70 150 72 166 100 174", w: 8.5 },
  { d: "M100 174 C122 180 120 194 104 202", w: 6 },
  { d: "M104 202 C97 206 98 212 100 218", w: 3.5 },
];

const MIRROR = "matrix(-1 0 0 1 200 0)";

export function Caduceus({ className = "" }: EmblemProps) {
  return (
    <svg viewBox="0 0 200 240" className={className} fill="none" aria-hidden="true" focusable="false">
      <Staff cx={100} top={34} />
      <circle cx="100" cy="22" r="10" fill="currentColor" />
      <rect x="93" y="31" width="14" height="6" rx="2" fill="currentColor" />
      <Wing />
      <Wing transform={MIRROR} />
      <Serpent body={CADUCEUS_SERPENT} head="translate(80 84) rotate(-8) scale(0.8)" />
      <Serpent body={CADUCEUS_SERPENT} head="translate(80 84) rotate(-8) scale(0.8)" transform={MIRROR} />
    </svg>
  );
}

// Paired watermark for the navy page heroes. Place before the hero's
// relative content wrapper so the content paints on top.
export function HeroEmblems() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden text-white md:block" aria-hidden="true">
      <RodOfAsclepius className="absolute -left-4 top-1/2 h-[110%] -translate-y-1/2 -rotate-6 opacity-[0.07]" />
      <Caduceus className="absolute -right-24 top-1/2 h-[110%] -translate-y-1/2 rotate-6 opacity-[0.07]" />
    </div>
  );
}
