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
    __resolveType({ ContentType }) {
      switch (ContentType) {
        case 'dataextension':
          return 'DataFolderDataExtension';
        case 'filterdefinition':
          return 'DataFolderFilterDefinition';
        case 'publication':
          return 'DataFolderPublication';
        default:
          return 'DataFolder';
      }
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
  DataFolderFilterDefinition: {
    ...commonResolvers,
    FilterDefinitions: async (obj) => {
      const results = await fuel.find('FilterDefinition', {
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
  DataFolderPublication: {
    ...commonResolvers,
    Publications: async (obj) => {
      const results = await fuel.find('Publication', {
        leftOperand: 'Category',
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
    DataFolderFilterDefinition: (_, { input }) => {
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
          rightOperand: 'filterdefinition',
        },
      });
    },

    /**
     *
     */
    DataFolderPublication: (_, { input }) => {
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
          rightOperand: 'publication',
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
