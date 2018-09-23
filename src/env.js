const { isURL } = require('validator');

const {
  cleanEnv,
  port,
  num,
  makeValidator,
} = require('envalid');

const soap = makeValidator((v) => {
  const opts = { protocols: ['https'], require_tld: true, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a SOAP https URL.');
});

const nonemptystr = makeValidator((v) => {
  const err = new Error('Expected a non-empty string');
  if (v === undefined || v === null || v === '') {
    throw err;
  }
  const trimmed = String(v).trim();
  if (!trimmed) throw err;
  return trimmed;
});

module.exports = cleanEnv(process.env, {
  PORT: port({ desc: 'The port that Express will listen on.', default: 5899 }),
  FUEL_API_CLIENT_ID: nonemptystr({ desc: 'The Marketing Cloud API client ID.' }),
  FUEL_API_CLIENT_SECRET: nonemptystr({ desc: 'The Marketing Cloud API client secret.' }),
  FUEL_API_CLIENT_URL: soap({ desc: 'The Marketing Cloud URL to connect to, e.g. https://webservice.s7.exacttarget.com/Service.asmx' }),
  EXACT_TARGET_CLIENT_ID: num({ desc: 'The Client.ID of the ExactTarget instance/BU.' }),
});
