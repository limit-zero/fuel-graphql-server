const fuel = require('../../fuel');

module.exports = {
  /**
   *
   */
  FilterDefinition: {
    Folder: obj => fuel.findById('DataFolder', obj.CategoryID),
  },
};
