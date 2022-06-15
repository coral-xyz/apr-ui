const { withPlausibleProxy } = require("next-plausible");

/** @type {import('next').NextConfig} */
module.exports = withPlausibleProxy()({
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
    legacyBrowsers: false,
    runtime: "nodejs",
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
    formats: ["image/avif", "image/webp"],
  },
});
