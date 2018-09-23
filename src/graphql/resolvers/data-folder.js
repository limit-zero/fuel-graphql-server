const fuel = require('../../fuel');
const sortBy = require('../../utils/sort-by');
const refID = require('../../utils/ref-id');

const commonResolvers = {
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
};

module.exports = {
  /**
   *
   */
  DataFolderInterface: {
    __resolveType(obj) {
      if (obj.ContentType === 'dataextension') {
        return 'DataFolderDataExtension';
      }
      return 'DataFolder';
    },
  },

  /**
   *
   */
  DataFolder: {
    ...commonResolvers,
  },

  /**
   *
   */
  DataFolderDataExtension: {
    ...commonResolvers,
    DataExtensions: async (obj) => {
      const results = await fuel.find('DataExtension', {
        leftOperand: 'CategoryID',
        operator: 'equals',
        rightOperand: Number(obj.ID),
      });
      return sortBy(results, 'Name');
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    DataFolder: (_, { input }) => {
      const { ObjectID } = input;
      return fuel.findByObjectId('DataFolder', ObjectID);
    },

    /**
     *
     */
    DataFolderDataExtension: (_, { input }) => {
      const { ObjectID } = input;
      return fuel.findOne('DataFolder', {
        leftOperand: {
          leftOperand: 'ObjectID',
          operator: 'equals',
          rightOperand: ObjectID,
        },
        operator: 'AND',
        rightOperand: {
          leftOperand: 'ContentType',
          operator: 'equals',
          rightOperand: 'dataextension',
        },
      });
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
