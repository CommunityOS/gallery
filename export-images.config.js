const { EXPORT_IMAGES_REMOTE_LIST } = require("./export-images-remote-list");

/**
 * @type {import('next-export-optimize-images').Config}
 */
const config = {
  cacheDir: "optimized-images-cache",
  sourceImageParser: ({ src, defaultParser }) => {
    // Check if the URL matches the Cloudflare pattern
    const regExpMatches = src.match(
      /^(https:\/\/imagedelivery\.net\/[\w-]+)\/([\w-]+)\/(\w+)$/,
    );
    if (!regExpMatches) {
      return defaultParser(src);
    }
    // Extract the path, image ID, and variant
    const [, pathWithoutName, imageId, variant] = regExpMatches;
    return {
      pathWithoutName: pathWithoutName || "",
      name: `${imageId}-${variant}`,
      extension: "avif",
    };
  },
  filenameGenerator: ({ pathWithoutName, name, width, extension }) => {
    // Safely handle potentially undefined pathWithoutName
    const sanitizedPath = (pathWithoutName || "")
      .replace(/^https?:\/\//, "")
      .replace(/\./g, "-");
    const filename = `${sanitizedPath}/${name}.${width}.${extension}`;
    return filename;
  },
  quality: 80, // Adjust quality as needed
  imageDir: "optimized-images",
  generateFormats: ["webp", "avif"], // Generate both WebP and AVIF formats
  remoteImages: EXPORT_IMAGES_REMOTE_LIST,
};

module.exports = config;
