module.exports = {
  DataFolder: [
    'ObjectID',
    'ID',
    'CustomerKey',
    'AllowChildren',
    'ContentType',
    'Description',
    'Name',
    'ParentFolder.ID',
    'ParentFolder.ObjectID',
    'IsActive',
    'IsEditable',
  ],
  DataExtension: [
    'ObjectID',
    'CustomerKey',
    'CategoryID',
    'Description',
    'IsSendable',
    'IsTestable',
    'Name',
  ],
  FilterDefinition: [
    'ObjectID',
    'CustomerKey',
    'CategoryID',
    'Description',
    'Name',
  ],
  SenderProfile: [
    'ObjectID',
    'CustomerKey',
    'Name',
    'FromName',
    'FromAddress',
    'Description',
  ],
};
