const { gql } = require('apollo-server-express');

const wrestlerTypeDefs = gql`
    type Mutation {
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

    type Query {
        wrestlers: [Wrestler]
    }

    # @key(fields: "wrestlerId"),  divisions: [ChampionshipDivisions] @requires(fields: "WrestlingCompany") OR @includes(if: WrestlingCompany.ChampionshipDivisions.length > 1)
    type Wrestler  {
        wrestlerId: ID! 
        companyName: String! @upper
        name: String!
        height: String @redacted(role: "WRESTLER")
        location: String @redacted(role: "BOOKER")
        injured: Boolean
    }   
`

module.exports = wrestlerTypeDefs;