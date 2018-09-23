const fuel = require('../../fuel');

module.exports = {
  /**
   *
   */
  DataExtension: {
    Folder: obj => fuel.resource('data-folder').findById(obj.CategoryID),
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
      return fuel.resource('data-extension').findByObjectId(ObjectID);
    },
  },
};
