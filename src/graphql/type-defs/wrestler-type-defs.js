const { gql } = require('apollo-server-express');

const wrestlerTypeDefs = gql`
    extend type Mutation {
        createWrestler(input: CreateWrestlerInput!) : Wrestler!
    }

    input CreateWrestlerInput {
        company: WrestlingCompanyInput!
        name: String!
        height: String
        location: String
        injured: Boolean
    }

    input WrestlingCompanyInput {
        companyName: String!
    }

    extend type Query {
        wrestlers: [Wrestler]
    }

    # @key(fields: "wrestlerId"),  divisions: [ChampionshipDivisions] @requires(fields: "WrestlingCompany") OR @includes(if: WrestlingCompany.ChampionshipDivisions.length > 1)
    type Wrestler  {
        wrestlerId: ID!
        company: String!
        name: String!
        height: String
        location: String
        injured: Boolean
    }   
`

module.exports = wrestlerTypeDefs;