const fuel = require('../../fuel');
const sortBy = require('../../utils/sort-by');

module.exports = {
  /**
   *
   */
  Query: {
    SenderProfiles: async () => {
      const results = await fuel.find('SenderProfile', {
        leftOperand: 'Client.ID',
        operator: 'equals',
        rightOperand: fuel.clientId,
      });
      return sortBy(results, 'Name');
    },
  },
};
