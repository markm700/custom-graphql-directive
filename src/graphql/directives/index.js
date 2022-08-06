const { upperDirectiveTransformer, uppercaseDirectiveTypeDefs } = require('./uppercaseDirective.js');
const { redactedDirectiveTransformer, redactedDirectiveTypeDefs } = require('./redactedDirective.js');

function transformSchemaWithDirectives(inputSchema) {
  inputSchema = upperDirectiveTransformer(inputSchema);
  inputSchema = redactedDirectiveTransformer (inputSchema);
  return inputSchema;
}

module.exports = {
  redactedDirectiveTypeDefs,
  transformSchemaWithDirectives,
  uppercaseDirectiveTypeDefs
}
