const Resource = require('../resource');
const { dataFolder: dataFolderProps } = require('../props');

class DataFolder extends Resource {
  /**
   *
   * @async
   * @param {string} id
   * @param {?array} props
   */
  async findById(id, props = dataFolderProps) {
    return this.fuel.findById('DataFolder', id, props);
  }

  /**
   *
   * @async
   * @param {string} oid
   * @param {?array} props
   */
  async findByObjectId(oid, props = dataFolderProps) {
    return this.fuel.findByObjectId('DataFolder', oid, props);
  }

  /**
   *
   * @async
   * @param {string} id
   * @param {?array} props
   */
  async findChildrenForId(id, props = dataFolderProps) {
    const filter = {
      leftOperand: 'ParentFolder.ID',
      operator: 'equals',
      rightOperand: Number(id),
    };
    return this.fuel.find('DataFolder', filter, props);
  }

  /**
   *
   * @async
   * @param {string} oid
   * @param {?array} props
   */
  async findChildrenForObjectId(oid, props = dataFolderProps) {
    const filter = {
      leftOperand: 'ParentFolder.ObjectID',
      operator: 'equals',
      rightOperand: oid,
    };
    return this.fuel.find('DataFolder', filter, props);
  }
}

module.exports = DataFolder;
