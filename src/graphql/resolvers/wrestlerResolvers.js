const { Wrestler } = require('../models');

const wrestlerResolvers = {
    Mutation: {
        createWrestler: async (parent, args, context, info) => { 
            try {
                const { company, name, height, location, injured } = args.input;  
                const { companyName } = company;
                //call code to create company in DB
                await Wrestler.query().insert({
                    companyName,
                    name,
                    height,
                    location,
                    injured
                });
                console.log(`${name} wrestler created for ${companyName}!`);
                const createdWrestler = await Wrestler.query()
                    .select('wrestlerId', 'companyName', 'name', 'height', 'location', 'injured')
                    .where('name', '=', name);
                console.log(`wrestler retrieved: ${JSON.stringify(createdWrestler)}`)
                return JSON.response(createdWrestler);
            } catch (err) {
                return err.message;
            }
        }
    },
    Query: {
        wrestlers: async () => {
            const wrestlers = await Wrestler.query();
            console.log(`Wrestlers: ${JSON.stringify(wrestlers)}`);
            return wrestlers;
        }
    }
}

module.exports = wrestlerResolvers;