const fuel = require('../../fuel');

module.exports = {
  /**
   *
   */
  List: {
    Folder: obj => fuel.findById('DataFolder', obj.Category),
  },
};
