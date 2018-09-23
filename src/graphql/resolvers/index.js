const deepAssign = require('deep-assign');

const dataExtension = require('./data-extension');
const dataFolder = require('./data-folder');

module.exports = deepAssign(
  dataExtension,
  dataFolder,
  {
    /**
     *
     */
    Query: {
      /**
       *
       */
      ping: () => 'pong',
    },
  },
);
