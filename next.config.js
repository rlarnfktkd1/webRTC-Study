const withCSS = require("@zeit/next-css");
const withSASS = require("@zeit/next-sass");
const withOptimizedImages = require("next-optimized-images");
const withOffline = require("next-offline");

module.exports = withOffline(
  withOptimizedImages(
    withCSS(
      withSASS({
        workboxOpts: {
          swDest: process.env.NEXT_EXPORT
            ? "service-worker.js"
            : "static/service-worker.js",
          runtimeCaching: [
            {
              urlPattern: /^https?.*/,
              handler: "NetworkFirst",
              options: {
                cacheName: "offlineCache",
                expiration: {
                  maxEntries: 200
                }
              }
            }
          ]
        },
        experimental: {
          async rewrites() {
            return [
              {
                source: "/service-worker.js",
                destination: "/_next/static/service-worker.js"
              }
            ];
          }
        },
        optimizeImages: false
      })
    )
  )
);
