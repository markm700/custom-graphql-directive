const {
    GraphQLDirective,
    DirectiveLocation,
    GraphQLString,
    GraphQLNonNull
  } = require('graphql')
  const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
  
  const redactedDirective = new GraphQLDirective({
    name: 'redacted',
    locations: [
      DirectiveLocation.ENUM,
      DirectiveLocation.ENUM_VALUE,
      DirectiveLocation.INPUT_OBJECT,
      DirectiveLocation.INTERFACE,
      DirectiveLocation.OBJECT,
      DirectiveLocation.SCALAR,
      DirectiveLocation.UNION,
      DirectiveLocation.FIELD_DEFINITION,
      DirectiveLocation.INPUT_FIELD_DEFINITION
    ],
    args: {
      category: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  })
  
  const redactedDirectiveTypeDefs = `directive @${redactedDirective.name}(role: String) on FIELD_DEFINITION`;
  
  const defaultFieldResolver = async (
    fieldConfig
  ) => {
    return fieldConfig;
  };
  
  function redactedDirectiveTransformer(schema) {
    return mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (
        fieldConfig,
        fieldName
        ) => {
        // Check whether this field has the specified directive
        const redactedDirectiveExists = getDirective(schema, fieldConfig, redactedDirective.name)?.[0];
        if (redactedDirectiveExists) {
        const { resolve = defaultFieldResolver } = fieldConfig;
          fieldConfig.resolve = async function (source, args, context, info) {
            const result = await resolve(source,args, context, info);
            if (redactedDirectiveExists['role'] !== 'BOOKER') { //BOOKER role granted access
              result[fieldName] = '[REDACTED]'; //WRESTLER, AGENT roles redacted
              return  result[fieldName]; 
            } 
            return result[fieldName];
          }
          return fieldConfig;
        }
      }
    });
  }
  
  module.exports = {
    redactedDirectiveTransformer,
    redactedDirectiveTypeDefs
  }
  
  