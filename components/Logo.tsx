export function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 42C24 42 4 31 4 17.5 4 11.1 8.9 6 15.2 6 19 6 22.2 8 24 11 25.8 8 29 6 32.8 6 39.1 6 44 11.1 44 17.5 44 31 24 42 24 42z"
        fill="#E4463B"
      />
      <rect x="20.5" y="13" width="7" height="18" rx="1.5" fill="#fff" />
      <rect x="15" y="18.5" width="18" height="7" rx="1.5" fill="#fff" />
    </svg>
  );
}

export function Logo({ size = 36, withTagline = true }: { size?: number; withTagline?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 select-none">
      <LogoMark size={size} />
      <span className="flex flex-col leading-none">
        <span className="flex items-baseline gap-1">
          <span className="font-extrabold tracking-tight text-brand-navy" style={{ fontSize: size * 0.55 }}>
            AVIUT
          </span>
        </span>
        {withTagline && (
          <span className="font-semibold text-brand-blue" style={{ fontSize: size * 0.32 }}>
            Healthcare
          </span>
        )}
      </span>
    </span>
  );
}
