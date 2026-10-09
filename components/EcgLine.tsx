// Heart-monitor trace used as a decorative section background.
// A faint static line with a brighter pulse sweeping along it (see .ecg-sweep).

const BEATS = 4;
const BEAT_WIDTH = 300;

// One PQRST complex starting at x on a baseline of y = 60.
function beat(x: number) {
  return [
    `L${x + 90} 60`,
    `Q${x + 100} 48 ${x + 110} 60`,
    `L${x + 124} 60 L${x + 130} 70 L${x + 140} 10 L${x + 150} 100 L${x + 158} 60`,
    `L${x + 180} 60 Q${x + 198} 40 ${x + 216} 60`,
    `L${x + BEAT_WIDTH} 60`,
  ].join(" ");
}

const TRACE = "M0 60 " + Array.from({ length: BEATS }, (_, i) => beat(i * BEAT_WIDTH)).join(" ");

export function EcgLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${BEATS * BEAT_WIDTH} 110`}
      preserveAspectRatio="none"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path d={TRACE} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.3" />
      <path
        d={TRACE}
        pathLength={1}
        className="ecg-sweep"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
