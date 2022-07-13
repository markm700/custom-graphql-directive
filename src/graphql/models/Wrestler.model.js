'use strict';

const { Model } = require('objection');

class Wrestler extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'wrestlers';
  }
}

module.exports = {
    Wrestler
};