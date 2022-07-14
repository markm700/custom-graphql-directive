const { Wrestler } = require('../models');

const wrestlerResolvers = {
    Mutation: {
        createWrestler: async (parent, args, context, info) => {
            const { companyName, name, height, location, injured } = args;
            //call code to create company in DB
            await Wrestler.query().insert({
                companyName,
                name,
                height,
                location,
                injured
            });
        }
    },
    Query: {
        wrestlers: async () => {
            const wrestlers = await Wrestler.query();
            console.log(`Wrestlers: ${wrestlers}`);
            return wrestlers;
        }
    }
}

module.exports = wrestlerResolvers;