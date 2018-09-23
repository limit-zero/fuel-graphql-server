const FuelSoap = require('fuel-soap');
const resources = require('./resources');

const { isArray } = Array;

class FuelClient {
  /**
   *
   * @param {object} options
   * @param {int} clientId The ExactTarget client ID for the business unit
   */
  constructor(options, clientId) {
    this.client = new FuelSoap(options);
    this.clientId = clientId;
    this.resources = resources(this);
  }

  /**
   *
   * @param {string} key
   */
  resource(key) {
    const resource = this.resources[key];
    if (!resource) throw new Error(`No Fuel resource found for '${key}'`);
    return resource;
  }

  /**
   *
   * @async
   * @param {string} type
   * @param {?array} props
   * @param {?object} options
   */
  retrieve(type, props, options) {
    return new Promise((resolve, reject) => {
      this.client.retrieve(type, props, options, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  /**
   *
   * @async
   * @param {string} type
   * @param {object} payload
   */
  create(type, payload) {
    return new Promise((resolve, reject) => {
      this.client.create(type, payload, null, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  /**
   *
   * @async
   * @param {string} type
   * @param {object} payload
   */
  perform(type, payload) {
    return new Promise((resolve, reject) => {
      this.client.perform(type, payload, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  /**
   *
   * @async
   * @param {string} type
   * @param {object} payload
   */
  update(type, payload) {
    return new Promise((resolve, reject) => {
      this.client.update(type, payload, null, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  /**
   *
   * @async
   * @param {string} type
   * @param {object} payload
   */
  delete(type, payload) {
    return new Promise((resolve, reject) => {
      this.client.delete(type, payload, null, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.body);
        }
      });
    });
  }

  /**
   *
   * @async
   * @param {string} type
   * @param {object} filter
   * @param {?array} props
   */
  async find(type, filter, props = ['ObjectID']) {
    const body = await this.retrieve(type, props, { filter });
    const result = this.formatBody(body, false);
    return result;
  }

  /**
   *
   * @async
   * @param {string} type
   * @param {object} filter
   * @param {?array} props
   */
  async findOne(type, filter, props = ['ObjectID']) {
    const body = await this.retrieve(type, props, { filter });
    const result = this.formatBody(body, true);
    return result;
  }

  /**
   *
   * @param {string} type
   * @param {number} id
   * @param {?array} props
   */
  findById(type, id, props) {
    const filter = {
      leftOperand: 'ID',
      operator: 'equals',
      rightOperand: Number(id),
    };
    return this.findOne(type, filter, props);
  }

  /**
   *
   * @param {string} type
   * @param {string} oid
   * @param {?array} props
   */
  findByObjectId(type, oid, props) {
    const filter = {
      leftOperand: 'ObjectID',
      operator: 'equals',
      rightOperand: oid,
    };
    return this.findOne(type, filter, props);
  }

  /**
   *
   * @param {object} body
   * @param {boolean} [asOne=false]
   */
  formatBody(body, asOne = false) { // eslint-disable-line class-methods-use-this
    const results = (body && isArray(body.Results)) ? body.Results.slice() : [];
    if (asOne) return results.shift() || null;
    return results;
  }
}

module.exports = FuelClient;
