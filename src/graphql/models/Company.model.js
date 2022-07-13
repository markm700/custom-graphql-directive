'use strict';

const { Model } = require('objection');

class WrestlingCompany extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'wrestling_company';
  }
}

module.exports = {
    WrestlingCompany
};