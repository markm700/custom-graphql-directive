'use strict';

const KNEX = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');
const { typeDefs } = require('./src/graphql/type-defs');
const { resolvers } = require('./src/graphql/resolvers');

const knex = KNEX(knexConfig.development);

// Bind all Models to the knex instance. Only need to do once
Model.knex(knex);

async function main() {
    startApolloServer(typeDefs, resolvers);
}

main()
    .then(() => knex.destroy())
    .catch((err) => {
        console.error(err);
        return knex.destroy();
});