/** @type {import('next').NextConfig} */
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const nextConfig = isStaticExport
  ? {
      // Public marketing pages only, for GitHub Pages (see .github/workflows/pages.yml)
      output: "export",
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {
      experimental: {
        serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
      },
    };

module.exports = nextConfig;
