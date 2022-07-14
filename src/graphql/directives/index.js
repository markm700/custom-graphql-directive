const { upperDirectiveTransformer, uppercaseDirectiveTypeDefs } = require('./uppercaseDirective.js')

function transformSchemaWithDirectives(inputSchema) {
  inputSchema = upperDirectiveTransformer(inputSchema);
  return inputSchema;
}

module.exports = {
  transformSchemaWithDirectives,
  uppercaseDirectiveTypeDefs
}
