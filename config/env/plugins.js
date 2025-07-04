module.exports = ({ env }) => {
    return ({
        email: {
            config: {
                provider: 'nodemailer',
                providerOptions: {
                    host: env('SMTP_HOST', 'in-v3.mailjet.com'),
                    port: env('SMTP_PORT', 587),
                    secure: false,
                    auth: {
                        user: env('SMTP_USER'),
                        pass: env('SMTP_PASS'),
                    },
                },
                settings: {
                    defaultFrom: 'support@genai.works',
                    defaultReplyTo: 'support@genai.works',
                },
            },
        },
        'users-permissions': {
            config: {
                email_confirmation: true,
                email_confirmation_redirection: env('EMAIL_CONFIRMATION_REDIRECT', `${process.env.MY_SERVER_URL}/email-confirmed`),
                jwt: {
                    expiresIn: '366d',
                },
                register: {
                    allowedFields: [
                        "first_name", "last_name", "email", "password",
                    ],
                },
            },
        },
        upload: {
            config: {
                sizeLimit: 250 * 1024 * 1024,
                provider: "@nexide/strapi-provider-bunny",
                providerOptions: {
                    api_key: process.env.BUNNY_API_KEY,
                    storage_zone: process.env.BUNNY_STORAGE_ZONE,
                    pull_zone: process.env.BUNNY_PULL_ZONE,
                    hostname: process.env.BUNNY_HOSTNAME,
                },
            }
        },
    });
}
