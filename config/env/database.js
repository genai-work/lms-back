module.exports = ({ env }) => {
    const client = env('DATABASE_CLIENT', 'mysql');

    const connections = {
        mysql: {
            connection: {
                host: env('DATABASE_HOST', 'localhost'),
                port: env.int('DATABASE_PORT', 3306),
                database: env('DATABASE_NAME', 'strapi'),
                user: env('DATABASE_USERNAME', 'strapi'),
                password: env('DATABASE_PASSWORD', 'strapi'),
                ssl: env('DATABASE_SSL', false)
            },
        },
    };

    return {
        connection: {
            client,
            ...connections[client],
            pool: {
                min: env.int('MIN_POOL', 0),
                max: env.int('MAX_POOL', 1000),
                createTimeoutMillis: env.int('CREATE_TIMEOUT', 30000),
                acquireTimeoutMillis: env.int('ACQUIRE_TIMEOUT', 600000),
                destroyTimeoutMillis: env.int('DESTROY_TIMEOUT', 5000),
                idleTimeoutMillis: env.int('IDLE_TIMEOUT', 300000),
                reapIntervalMillis: env.int('REAP_INTERVAL', 500),
                createRetryIntervalMillis: env.int('CREATE_RETRY_INTERVAL', 100),
                propagateCreateError: env.bool('PROPAGATE_CREATE_ERROR', false),
            },
            acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 600000),
            debug: env('DATABASE_DEBUG', false),
        },
        settings: {
            forceMigration: false,
            runMigrations: false,
            useTypescriptMigrations: false
        }
    };
};
