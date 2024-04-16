const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  webpack5: true,
  images: {
    domains: ["images.unsplash.com", "images.pexels.com"],
  },
});
