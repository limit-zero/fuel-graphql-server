const fuel = require('../../fuel');
const sortBy = require('../../utils/sort-by');
const refID = require('../../utils/ref-id');

module.exports = {
  /**
   *
   */
  DataFolderInterface: {
    __resolveType() {
      // if (obj.ContentType === 'dataextension') {
      //   return 'DataFolderDataExtension';
      // }
      return 'DataFolder';
    },
  },

  /**
   *
   */
  DataFolder: {
    ParentFolder: (obj) => {
      const ObjectID = refID(obj, 'ParentFolder', 'ObjectID');
      if (!ObjectID) return null;
      return fuel.resource('data-folder').findByObjectId(ObjectID);
    },
    SubFolders: async (obj) => {
      const { ObjectID } = obj;
      const results = await fuel.resource('data-folder').findChildrenForObjectId(ObjectID);
      return sortBy(results, 'Name');
    },
  },

  /**
   *
   */
  Query: {
    DataFolder: async (_, { input }) => {
      const { ObjectID } = input;
      return fuel.resource('data-folder').findByObjectId(ObjectID);
    },

    /**
     *
     */
    AllDataFolders: async (_, { input }) => {
      const { rootOnly } = input;
      let results = [];
      if (rootOnly) {
        results = await fuel.resource('data-folder').findChildrenForId(0);
      }
      return sortBy(results, 'Name');
    },
  },
};
