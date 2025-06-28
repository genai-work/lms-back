require('dotenv').config();
const axios = require('axios');

const isStaging = process.env.CUSTOM_NODE_ENV === 'development' || process.env.CUSTOM_NODE_ENV === 'staging';

const RULES = {
    task: "*/15 * * * * *",
};

module.exports = {
    task: {
        task: ({ strapi }) => {
            return;

            if (isStaging) return;

            axios.get(`${process.env.MY_SERVER_URL}/api/aggregator/getNews`)
                .then(response => {})
                .catch(error => {});
        },
        options: {
            rule: RULES.task,
        },
    },
};
