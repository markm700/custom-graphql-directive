const { gql } = require('apollo-server-express');

const wrestlerTypeDefs = gql`
    type Mutation {
        createCompany(input: CreateCompanyInput!) : WrestlingCompany!
    }

    input CreateCompanyInput {
        name: String!
        allowedDivisions: [ChampionshipDivisions]!
        maxRosterSize: Int!
        headquarterCity: String
        yearStarted: Int
    }

    type Query {
        companies: [WrestlingCompany!]!
    }

    type WrestlingCompany  {
        companyId: ID! @redacted(role: "BOOKER")
        name: String! @upper
        divisions: [ChampionshipDivisions!]!
        maxRosterSize: Int! 
        headquarterCity: String @redacted(role: "AGENT")
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