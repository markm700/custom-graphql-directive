const { WrestlingCompany } = require('../models');

const wrestlingCompanyResolvers = {
    Mutation: {
        createCompany: async (parent, args) => {
            try {
                const { name, allowedDivisions, maxRosterSize, headquarterCity, yearStarted } = args.input;
                //call code to create company in DB
                await WrestlingCompany.query().insert({
                    name,
                    allowedDivisions,
                    maxRosterSize,
                    headquarterCity,
                    yearStarted
                });
                console.log(`${name} wrestling company created!`);
                const createdCompany = await WrestlingCompany.query()
                    .select('companyId', 'name', 'allowedDivisions', 'maxRosterSize', 'headquarterCity', 'yearStarted')
                    .where('name', '=', name);
                return JSON.response(createdCompany);
            } catch (err) {
                return err.message;
            }
        }
    },
    Query: {
        companies: async () => {
            const companies = await WrestlingCompany.query();
            console.log(`Companies: ${JSON.stringify(companies)}`);
            return companies.map(c => ({...c, divisions: c.allowedDivisions.split(",") }));
        }
    }
}

module.exports = wrestlingCompanyResolvers;