const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
//const { buildSubgraphSchema } = require('@apollo/subgraph');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const http = require('http');
const KNEX = require('knex');
const knexConfig = require('./knexfile');
const { Model } = require('objection');
const { typeDefs } = require('./src/graphql/type-defs');
const { resolvers } = require('./src/graphql/resolvers');
const { transformSchemaWithDirectives, uppercaseDirectiveTypeDefs } = require('./src/graphql/directives');

const knex = KNEX(knexConfig.development);
//console.log(knex);
// Bind all Models to the knex instance. Only need to do once
Model.knex(knex);

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  let createdSchema = makeExecutableSchema({ 
    typeDefs: [
      uppercaseDirectiveTypeDefs,
      ...typeDefs
    ], 
    resolvers 
  });

  //transform schema by applying directives
  createdSchema = transformSchemaWithDirectives(createdSchema);

  const server = new ApolloServer({
    schema: createdSchema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await knex.destroy();
            }
          }
        }
      }],
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

async function main() {
  await startApolloServer(typeDefs, resolvers);
};

main()
  .catch((err) => {
    console.error(err);
    return knex.destroy();
  });