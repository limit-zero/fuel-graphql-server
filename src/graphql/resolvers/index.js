const deepAssign = require('deep-assign');
const GraphQLJSON = require('graphql-type-json');

const dataExtension = require('./data-extension');
const dataFolder = require('./data-folder');
const filterDefinition = require('./filter-definition');
const list = require('./list');
const publication = require('./publication');

module.exports = deepAssign(
  dataExtension,
  dataFolder,
  filterDefinition,
  list,
  publication,
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
