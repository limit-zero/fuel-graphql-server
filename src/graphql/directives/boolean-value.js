
const { SchemaDirectiveVisitor } = require('graphql-tools');
const objectPath = require('object-path');

class BooleanValueDirective extends SchemaDirectiveVisitor {
  /**
   *
   * @param {*} field
   */
  visitFieldDefinition(field) {
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (obj) => {
      const { localField } = this.args;
      const value = objectPath.get(obj, localField || field.name);
      if (!value) return false;
      if (value === 'false') return false;
      return Boolean(value);
    };
  }
}

module.exports = BooleanValueDirective;
