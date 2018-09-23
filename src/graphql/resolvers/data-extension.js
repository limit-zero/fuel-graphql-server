const fuel = require('../../fuel');

module.exports = {
  /**
   *
   */
  DataExtension: {
    Folder: obj => fuel.findById('DataFolder', obj.CategoryID),
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
