const { gql } = require('apollo-server-express');

const wrestlerTypeDefs = gql`
    extend type Mutation {
        createCompany(input: CreateCompanyInput!) : WrestlingCompany!
    }

    # @upper directive set to ensure that the input is uppercase
    input CreateCompanyInput {
        name: String! @upper
        allowedDivisions: [ChampionshipDivisions]!
        maxRosterSize: Int!
        headquarterCity: String
        yearStarted: Int
    }

    extend type Query {
        companies: [WrestlingCompany!]!
    }

    # @key directive indicates field(s) used to uniquely identify object, @key(fields: "companyId")
    type WrestlingCompany  {
        companyId: ID!
        name: String! @upper
        divisions: [ChampionshipDivisions!]!
        maxRosterSize: Int!
        headquarterCity: String
        yearStarted: Int
    }

    enum ChampionshipDivisions {
        MensMain
        MensMidCard
        MensTag
        TriosTag
        WomensMain
        WomensMidcard
        WomensTag
    }
`

module.exports = wrestlerTypeDefs;