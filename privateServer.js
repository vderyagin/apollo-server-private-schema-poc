const { ApolloServer, gql } = require('apollo-server-express');

const books = [
  {
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];


const typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    secret: String!
    books: [Book]
  }
`;


const resolvers = {
  Query: {
    books: () => books,
    secret: () => 'BLA_BLA_BLA',
  },
};


const server = new ApolloServer({typeDefs, resolvers});

module.exports = server.getMiddleware();
