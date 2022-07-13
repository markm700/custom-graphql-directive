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
        },
        deleteCompanyByName: async (parent, args) => {
            try {
                const companyToDelete = await WrestlingCompany.query()
                    .select('companyId', 'name', 'allowedDivisions', 'maxRosterSize', 'headquarterCity', 'yearStarted')
                    .where('name', '=', args.name);
                console.log(`${companyToDelete} is the wrestling company to be deleted`);
                const numDeleted = await WrestlingCompany.query().delete()
                    where('name', '=', args.name);
                console.log(`${numDeleted} ${args.name} wrestling companies have been bankrupted and sold`);
                return companyToDelete;
            } catch (err) {
                return err.message;
            }
        }
    },
    Query: {
        companies: async () => {
            const companies = await WrestlingCompany.query();
            console.log(`Companies: ${JSON.stringify(companies)}`);
            //return companies;
            [...companies.map(c => ({...c, __typename: 'WrestlingCompany' }))];
        }
    }
}

module.exports = wrestlingCompanyResolvers;