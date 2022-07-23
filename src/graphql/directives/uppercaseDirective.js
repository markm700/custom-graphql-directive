const {
  GraphQLDirective,
  DirectiveLocation,
  GraphQLString,
  GraphQLNonNull
} = require('graphql')
const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');

const uppercaseDirective = new GraphQLDirective({
  name: 'upper',
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

const uppercaseDirectiveTypeDefs = `directive @${uppercaseDirective.name} on FIELD_DEFINITION | INPUT_FIELD_DEFINITION`;

const defaultFieldResolver = async (
  fieldConfig
) => {
  return JSON.stringify(fieldConfig);
};

// This function takes in a schema and adds upper-casing logic to every resolver for an object field that has the 'upper' directive
function upperDirectiveTransformer(schema) {
  return mapSchema(schema, {
    // Executes once for each object field in the schema
    // Add other MapperKinds, such as ENUM_VALUE, for other locations
    [MapperKind.OBJECT_FIELD]: (
      fieldConfig
      ) => {
      // Check whether this field has the specified directive
      const upperDirective = getDirective(schema, fieldConfig, uppercaseDirective.name)?.[0];
      if (upperDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        // Replace the original resolver/GQL with a function that calls the original resolver, then converts its result to upper case
        fieldConfig.resolve = async function (source, args, context, info) {
          const result = await resolve(source, args, context, info);
          console.log(`result: ${result}`);
          if (typeof result === 'string') {
            return result.toUpperCase();
          }
          return result;
        }
        return fieldConfig;
      }
    }
  });
}

module.exports = {
  upperDirectiveTransformer,
  uppercaseDirectiveTypeDefs
}

