module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'images.genai.works', 'market-assets.strapi.io', 'market-api.strapi.io', 'strapi.io', process.env.BUNNY_PULL_ZONE],
          "script-src": ["'self'", "cdn.jsdelivr.net", "blob:"],
          'media-src': ["'self'", 'data:', 'blob:', 'images.genai.works', 'market-assets.strapi.io', 'market-api.strapi.io', 'strapi.io'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://aggregator.genai.works',
        'http://localhost:1336',
        'http://localhost:3000',
      ],
      methods: '*',
      headers: '*',
      keepHeaderOnError: true,
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  {
    name: "strapi::body",
    config: {
      formLimit: 250 * 1024 * 1024,
      jsonLimit: 250 * 1024 * 1024,
      textLimit: 250 * 1024 * 1024,
      formidable: {
        maxFileSize: 250 * 1024 * 1024,
      }
    },
  },
  {
    name: 'strapi::compression',
    config: {
      br: false,
      gzip: true,
      deflate: false,
    },
  },
  'strapi::favicon',
  'strapi::public',
  'strapi::session',
];