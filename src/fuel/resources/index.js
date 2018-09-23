const DataFolder = require('./data-folder');
const DataExtension = require('./data-extension');

module.exports = fuel => ({
  'data-extension': new DataExtension(fuel),
  'data-folder': new DataFolder(fuel),
});
