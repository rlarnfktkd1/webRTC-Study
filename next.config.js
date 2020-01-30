const withCSS = require("@zeit/next-css");
const withSASS = require("@zeit/next-sass");
const withOptimizedImages = require("next-optimized-images");
module.exports = withOptimizedImages(
  withCSS(
    withSASS({
      // cssModules: true
      optimizeImages: false
    })
  )
);
