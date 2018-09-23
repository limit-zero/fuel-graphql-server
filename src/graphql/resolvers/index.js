const deepAssign = require('deep-assign');
const GraphQLJSON = require('graphql-type-json');

const dataExtension = require('./data-extension');
const dataFolder = require('./data-folder');
const filterDefinition = require('./filter-definition');

module.exports = deepAssign(
  dataExtension,
  dataFolder,
  filterDefinition,
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
