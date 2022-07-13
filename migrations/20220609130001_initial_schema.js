'use strict';

exports.up = (knex) => {
    let databaseTables = knex.schema.createTable('wrestling_company', (table) => {
        table.increments('companyId').primary();
        table.string('name');
        table.specificType('allowedDivisions', 'string[]');
        table.integer('maxRosterSize');
        table.string('headquarterCity');
        table.integer('yearStarted');
      }).createTable('wrestlers', (table) => {
        table.increments('wrestlerId').primary();
        table.specificType('companyName','WrestlingCompany');
        table.string('name');
        table.string('height');
        table.string('location');
        table.boolean('injured');
      });
    return databaseTables;
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('wrestling_company').dropTableIfExists('wrestlers');
};