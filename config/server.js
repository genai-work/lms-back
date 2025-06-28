const cronTasks = require("./cron-tasks");

module.exports = ({ env }) => ({
  proxy: {
    koa: true,
  },
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1336),
  url: env('MY_SERVER_URL'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  cron: {
    enabled: true,
    tasks: cronTasks
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
