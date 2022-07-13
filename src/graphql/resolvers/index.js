const merge = require('lodash.merge')

const wrestlingCompanyResolvers = require('./companyResolvers');
const wrestlerResolvers = require('./wrestlerResolvers');

const resolvers = merge({}, wrestlingCompanyResolvers, wrestlerResolvers);

module.exports = { resolvers };