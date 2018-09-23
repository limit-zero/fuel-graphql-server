const fuel = require('../../fuel');
const sortBy = require('../../utils/sort-by');

const { isArray } = Array;

module.exports = {
  /**
   *
   */
  DataExtension: {
    /**
     *
     */
    Folder: obj => fuel.findById('DataFolder', obj.CategoryID),

    /**
     *
     */
    Fields: async ({ CustomerKey }) => {
      const results = await fuel.find('DataExtensionField', {
        leftOperand: 'DataExtension.CustomerKey',
        operator: 'equals',
        rightOperand: CustomerKey,
      });
      return sortBy(results, 'Name');
    },

    /**
     *
     */
    Rows: async ({ CustomerKey, Name: DEName }) => {
      const results = await fuel.find('DataExtensionField', {
        leftOperand: 'DataExtension.CustomerKey',
        operator: 'equals',
        rightOperand: CustomerKey,
      });
      const rows = await fuel.find(`DataExtensionObject[${DEName}]`, undefined, results.map(r => r.Name));
      return rows.map(({ Properties }) => {
        const { Property } = Properties;
        if (isArray(Property)) {
          return Property.reduce((o, { Name, Value }) => ({ ...o, [Name]: Value }), {});
        }
        const { Name, Value } = Property;
        return { [Name]: Value };
      });
    },
  },

  /**
   *
   */
  Query: {
    /**
     *
     */
    DataExtension: (_, { input }) => {
      const { ObjectID } = input;
      return fuel.findByObjectId('DataExtension', ObjectID);
    },
  },
};
