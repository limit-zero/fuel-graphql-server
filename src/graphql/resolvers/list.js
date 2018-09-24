const fuel = require('../../fuel');

module.exports = {
  /**
   *
   */
  List: {
    Name: ({ ListName }) => ListName.split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' '),
    Folder: obj => fuel.findById('DataFolder', obj.Category),
    ListSubscribers: obj => fuel.find('ListSubscriber', {
      leftOperand: 'ListID',
      operator: 'equals',
      rightOperand: Number(obj.ID),
    }),
  },

  /**
   *
   */
  Query: {
    List: (_, { input }) => {
      const { ObjectID } = input;
      return fuel.findByObjectId('List', ObjectID);
    },
  },
};
