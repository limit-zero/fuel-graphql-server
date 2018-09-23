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
    const filter = {
      leftOperand: 'ID',
      operator: 'equals',
      rightOperand: Number(id),
    };
    const body = await this.fuel.retrieve('DataFolder', props, { filter });
    const result = this.fuel.formatBody(body, true);
    if (!result) return null;
    return result;
  }
}

module.exports = DataFolder;
