'use strict';

const axios = require('axios');

module.exports = {
  init(providerOptions) {
    return {
      async authenticate({ accessToken }) {
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const profile = response.data;

        return {
          email: profile.email,
          firstname: profile.given_name,
          lastname: profile.family_name,
          picture: profile.picture,
          provider: "google",
          username: profile.name,
        };
      },
    };
  },
};
