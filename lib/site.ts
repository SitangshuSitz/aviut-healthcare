// True when building the static public site for GitHub Pages (no auth, DB, or payments).
export const isStaticSite = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";
