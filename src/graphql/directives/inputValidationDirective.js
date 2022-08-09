const {
    GraphQLDirective,
    DirectiveLocation,
    GraphQLString,
    GraphQLNonNull
  } = require('graphql')
  const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
  
  const inputValidateDirective = new GraphQLDirective({
    name: 'validate',
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
  
  const inputValidationDirectiveTypeDefs = `directive @${inputValidateDirective.name}(length: Int!) on INPUT_FIELD_DEFINITION`;
  
  const defaultFieldResolver = async (
    fieldConfig
  ) => {
    return fieldConfig;
  };
  
  function inputValidationDirectiveTransformer(schema) {
    return mapSchema(schema, {
      [MapperKind.INPUT_FIELD_DEFINITION]: (
        fieldConfig,
        fieldName
        ) => {
        // Check whether this field has the specified directive
        const inputValidateDirectiveExists = getDirective(schema, fieldConfig, redactedDirective.name)?.[0];
        if (inputValidateDirectiveExists) {
        const { resolve = defaultFieldResolver } = fieldConfig;
          fieldConfig.resolve = async function (source, args, context, info) {
            const result = await resolve(source,args, context, info);
            if (result[fieldName].length !== inputValidateDirectiveExists['length']) {
              result[fieldName] = 'ERROR: Not Entered Properly';
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
    inputValidationDirectiveTransformer,
    inputValidationDirectiveTypeDefs
  }
  
  