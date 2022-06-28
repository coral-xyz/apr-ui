const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
module.exports = withPlausibleProxy()({
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
    legacyBrowsers: false,
    images: { allowFutureImage: true },
  },
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
});
