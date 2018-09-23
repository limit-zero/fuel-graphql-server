const Resource = require('../resource');
const { dataExtension: dataExtensionProps } = require('../props');

class DataExtension extends Resource {
  /**
   *
   * @async
   * @param {string} id
   * @param {?array} props
   */
  async findById(id, props = dataExtensionProps) {
    return this.fuel.findById('DataExtension', id, props);
  }

  /**
   *
   * @async
   * @param {string} oid
   * @param {?array} props
   */
  async findByObjectId(oid, props = dataExtensionProps) {
    return this.fuel.findByObjectId('DataExtension', oid, props);
  }
}

module.exports = DataExtension;
