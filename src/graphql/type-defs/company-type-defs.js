const { gql } = require('apollo-server-express');

const wrestlerTypeDefs = gql`
    extend type Mutation {
        createCompany(input: CreateCompanyInput!) : WrestlingCompany!
        deleteCompanyByName(name: String!) : WrestlingCompany!
    }

    input CreateCompanyInput {
        name: String!
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
        name: String!
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