const deepAssign = require('deep-assign');
const GraphQLJSON = require('graphql-type-json');

const dataExtension = require('./data-extension');
const dataFolder = require('./data-folder');
const filterDefinition = require('./filter-definition');
const list = require('./list');
const publication = require('./publication');
const senderProfile = require('./sender-profile');

module.exports = deepAssign(
  dataExtension,
  dataFolder,
  filterDefinition,
  list,
  publication,
  senderProfile,
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
