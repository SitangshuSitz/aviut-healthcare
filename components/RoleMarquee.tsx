const ROLES = [
  "Registered Nurses",
  "ICU Nurses",
  "Doctors",
  "Physiotherapists",
  "Lab Technicians",
  "Medical Representatives",
  "Pharmacists",
  "Radiographers",
  "Care Coordinators",
  "Medical Assistants",
  "OT Technicians",
  "Dietitians",
  "Hospital Administrators",
];

// Continuously scrolling strip of the healthcare roles Aviut is built for.
export function RoleMarquee() {
  return (
    <div className="marquee border-y border-brand-navy/10 bg-white py-5" aria-label="Healthcare roles on Aviut">
      <div className="marquee-track">
        {[...ROLES, ...ROLES].map((role, i) => (
          <span
            key={i}
            aria-hidden={i >= ROLES.length}
            className="mx-6 inline-flex items-center gap-3 whitespace-nowrap text-sm font-semibold uppercase tracking-widest text-brand-navy/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-red" />
            {role}
          </span>
        ))}
      </div>
    </div>
  );
}
