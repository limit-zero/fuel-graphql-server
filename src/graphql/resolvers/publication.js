const fuel = require('../../fuel');

module.exports = {
  /**
   *
   */
  Publication: {
    Folder: obj => fuel.findById('DataFolder', obj.Category),
  },
};
