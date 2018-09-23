const fuel = require('../../fuel');

module.exports = {
  /**
   *
   */
  List: {
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
    List: async (_, { input }) => {
      const { ObjectID } = input;
      const list = await fuel.findByObjectId('List', ObjectID);
      console.info(list);
      return list;
    },
  },
};
