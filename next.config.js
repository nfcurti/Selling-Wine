const env = require('dotenv').config({path: './.env'});
require('dotenv').config()

module.exports = {
  target: 'server',
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    return config;
  },

  experimental: {publicDirectory: true},
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    stripe: {
      publicKey: process.env.STRIPE_PUBLIC_KEY,
    },
    invitationCode: process.env.REACT_APP_INVITATION_CODE,
    isTestMode:
      process.env.STRIPE_PUBLIC_KEY &&
      process.env.STRIPE_PUBLIC_KEY.indexOf('pk') > -1,
  },
};
