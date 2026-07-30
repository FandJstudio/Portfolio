import type { NextConfig } from "next";

import { defaultLocale } from "./src/lib/i18n";

const nextConfig: NextConfig = {
  /*
    Nodemailer resolves some of its internals at runtime, which a bundler can
    mangle. Loading it through native require keeps the serverless build honest.
  */
  serverExternalPackages: ["nodemailer"],

  async redirects() {
    return [
      /* Every page lives under a locale segment, so the bare root has to land somewhere. */
      { source: "/", destination: `/${defaultLocale}`, permanent: false },
    ];
  },
};

export default nextConfig;
