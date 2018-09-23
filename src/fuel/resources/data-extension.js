const Resource = require('../resource');
const { dataExtension: dataExtensionProps } = require('../props');

class DataExtension extends Resource {
  /**
   *
   * @async
   * @param {string} oid
   * @param {?array} props
   */
  async findByObjectId(oid, props = dataExtensionProps) {
    const filter = {
      leftOperand: 'ObjectID',
      operator: 'equals',
      rightOperand: oid,
    };
    const body = await this.fuel.retrieve('DataExtension', props, { filter });
    const result = this.fuel.formatBody(body, true);
    if (!result) return null;
    return result;
  }
}

module.exports = DataExtension;
