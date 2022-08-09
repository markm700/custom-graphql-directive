const { upperDirectiveTransformer, uppercaseDirectiveTypeDefs } = require('./uppercaseDirective.js');
const { redactedDirectiveTransformer, redactedDirectiveTypeDefs } = require('./redactedDirective.js');
const { inputValidationDirectiveTransformer, inputValidationDirectiveTypeDefs } = require('./inputValidationDirective');

function transformSchemaWithDirectives(inputSchema) {
  inputSchema = upperDirectiveTransformer(inputSchema);
  inputSchema = redactedDirectiveTransformer (inputSchema);
  inputSchema = inputValidationDirectiveTransformer(inputSchema);
  return inputSchema;
}

module.exports = {
  inputValidationDirectiveTypeDefs,
  redactedDirectiveTypeDefs,
  transformSchemaWithDirectives,
  uppercaseDirectiveTypeDefs
}
