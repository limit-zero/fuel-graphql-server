const deepAssign = require('deep-assign');
const GraphQLJSON = require('graphql-type-json');

const dataExtension = require('./data-extension');
const dataFolder = require('./data-folder');

module.exports = deepAssign(
  dataExtension,
  dataFolder,
  {
    /**
     *
     */
    JSON: GraphQLJSON,

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
