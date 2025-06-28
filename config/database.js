module.exports = ({ env }) => ({
  connection: {
    client: env('DATABASE_CLIENT', 'mysql'),
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 8889),
      database: env('DATABASE_NAME', 'lms'),
      user: env('DATABASE_USERNAME', 'root'),
      password: env('DATABASE_PASSWORD', 'root'),
      ssl: env.bool('DATABASE_SSL', false),
      charset: 'utf8mb4',
    },
    debug: false,
    pool: {
      min: 0,
      max: 150,
      createTimeoutMillis: 30000,
      acquireTimeoutMillis: 600000,
      idleTimeoutMillis: 300000,
      reapIntervalMillis: 30000,
      createRetryIntervalMillis: 30000,
      propagateCreateError: false,
    },
    acquireConnectionTimeout: 600000,
    settings: {
      forceMigration: false,
      runMigrations: false,
      useTypescriptMigrations: false,
    }
  },
});