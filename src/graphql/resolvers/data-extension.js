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
      const { id } = input;
      return fuel.resource('data-extension').findByObjectId(id);
    },
  },
};
