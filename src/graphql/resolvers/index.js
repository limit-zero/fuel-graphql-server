const deepAssign = require('deep-assign');

const dataFolder = require('./data-folder');

module.exports = deepAssign(
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
