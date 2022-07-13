const {
    GraphQLDirective,
    DirectiveLocation,
    GraphQLString,
    GraphQLNonNull
  } = require('graphql')
  
  const UppercaseDirective = new GraphQLDirective({
    name: 'upper',
    locations: [
      DirectiveLocation.ENUM,
      DirectiveLocation.ENUM_VALUE,
      DirectiveLocation.INPUT_OBJECT,
      DirectiveLocation.INTERFACE,
      DirectiveLocation.OBJECT,
      DirectiveLocation.SCALAR,
      DirectiveLocation.UNION,
      DirectiveLocation.FIELD_DEFINITION
    ],
    args: {
      category: {
        type: new GraphQLNonNull(GraphQLString)
      }
    }
  })
  
  module.exports = {
    UppercaseDirective
  }
  
  