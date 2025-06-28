module.exports = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1336),
    url: env('MY_SERVER_URL'),
    transfer: {
        remote: {
            enabled: false
        }
    },
    app: {
        keys: env.array('APP_KEYS')
    },
})
