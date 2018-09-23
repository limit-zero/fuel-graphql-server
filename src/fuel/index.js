const Fuel = require('./client');
const env = require('../env');

const {
  FUEL_API_CLIENT_ID,
  FUEL_API_CLIENT_SECRET,
  FUEL_API_CLIENT_URL,
  EXACT_TARGET_CLIENT_ID,
} = env;

const client = new Fuel({
  auth: {
    clientId: FUEL_API_CLIENT_ID,
    clientSecret: FUEL_API_CLIENT_SECRET,
    retry: true,
  },
  soapEndpoint: FUEL_API_CLIENT_URL,
  retry: true,
}, EXACT_TARGET_CLIENT_ID);

module.exports = client;
