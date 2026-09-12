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
        d="M24 42S5 31.5 5 17.8C5 11.3 10.2 6 16.6 6c3.4 0 6.6 1.6 8.6 4.2C27.2 7.6 30.4 6 33.8 6 40.2 6 45 11.3 45 17.8 45 31.5 24 42 24 42z"
        transform="translate(-1)"
        fill="#E4463B"
      />
      <rect x="18.5" y="14" width="7" height="20" rx="1.5" fill="#fff" />
      <rect x="11.5" y="21" width="21" height="7" rx="1.5" fill="#fff" />
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
