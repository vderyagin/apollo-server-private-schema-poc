const { ApolloServer, gql } = require('apollo-server-express');

const express = require('express');

const privateMiddleware = require('./privateServer');

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
    books: [Book]
  }
`

const resolvers = {
  Query: {
    books: () => books,
  },
};

let app = express();

const server = new ApolloServer({typeDefs, resolvers});

const publicMw = server.getMiddleware();

const schemaMiddleware = (req, res, next) => {
  let mw = publicMw;
  if (req.query.private === 'true') {
    console.log('private');
    mw = privateMiddleware;
  }

  return mw(req, res, next);
};

app.use(schemaMiddleware);

app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)
