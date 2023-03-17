// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  /* If trying out the experimental appDir, comment the i18n config out
   * @see https://github.com/vercel/next.js/issues/41980 */
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "242720404619-nqae733k5udqq6ja1eujrt7b03q0rfdl.apps.googleusercontent.com",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "uhfiyrlkeagwxjggxljl.supabase.co",
      "cloudflare-ipfs.com",
      "source.unsplash.com",
    ],
  },
};
export default config;
