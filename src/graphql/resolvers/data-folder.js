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
      return fuel.findByObjectId('DataFolder', ObjectID);
    },
    SubFolders: async (obj) => {
      const { ObjectID } = obj;
      const results = await fuel.find('DataFolder', {
        leftOperand: 'ParentFolder.ObjectID',
        operator: 'equals',
        rightOperand: ObjectID,
      });
      return sortBy(results, 'Name');
    },
  },

  /**
   *
   */
  Query: {
    DataFolder: async (_, { input }) => {
      const { ObjectID } = input;
      return fuel.findByObjectId('DataFolder', ObjectID);
    },

    /**
     *
     */
    DataFolders: async (_, { input }) => {
      const { filter } = input;
      const results = await fuel.find('DataFolder', filter || {
        leftOperand: 'ParentFolder.ID',
        operator: 'equals',
        rightOperand: 0,
      });
      return sortBy(results, 'Name');
    },
  },
};
