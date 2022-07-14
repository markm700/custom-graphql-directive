const { convertUppercaseDirective, uppercaseDirectiveTypeDefs } = require('./uppercaseDirective.js')

function transformSchemaWithDirectives(inputSchema) {
  inputSchema = convertUppercaseDirective(inputSchema);
  return inputSchema;
}

module.exports = {
  transformSchemaWithDirectives,
  uppercaseDirectiveTypeDefs
}
