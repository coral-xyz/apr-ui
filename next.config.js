const { withSentryConfig } = require("@sentry/nextjs");
const { withPlausibleProxy } = require("next-plausible");

const moduleExports = withPlausibleProxy()({
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

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions);
