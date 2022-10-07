const { i18n } = require("./next-i18next.config");


const nextConfig = {
  i18n: {
    locales: ['sv','en' ],
    defaultLocale: 'sv',
    domains: [
      {
        domain: 'missing.catsgtb.se',
        defaultLocale: 'sv',
      },
      {
        domain: 'missing.catsgtb.se/en',
        defaultLocale: 'en',
      },
    ],
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  swcMinify: false,
  images: {
    imageSizes: [16, 32, 64, 128],
    domains: [
      "missing.catsgtb",
      "www.missing.catsgtb",
      "images.ctfassets.net",
    ],
    minimumCacheTTL: 3600,
    formats: ["image/webp"],
  },

};

module.exports = nextConfig;

