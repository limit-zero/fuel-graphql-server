const fuel = require('../../fuel');
const sortBy = require('../../utils/sort-by');

module.exports = {
  /**
   *
   */
  Query: {
    SendClassifications: async () => {
      const results = await fuel.find('SendClassification', {
        leftOperand: 'Client.ID',
        operator: 'equals',
        rightOperand: fuel.clientId,
      });
      return sortBy(results, 'Name');
    },
  },
};
