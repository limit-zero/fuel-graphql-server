module.exports = {
  DataFolderInterface: {
    __resolveType(obj) {
      if (obj.ContentType === 'dataextension') {
        return 'DataFolderDataExtension';
      }
      return null;
    },
  },
};
