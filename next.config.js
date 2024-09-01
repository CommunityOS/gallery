const withExportImages = require("next-export-optimize-images");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "imagedelivery.net" },
      { hostname: "images.jsconf.cl" },
      { hostname: "cdn.sanity.io" },
    ],
    // loader: "custom",
    // loaderFile: "./utils/image-loader.ts",
  },
  poweredByHeader: false,
  reactStrictMode: true,
  output: "export",
};

module.exports = withExportImages(nextConfig);
