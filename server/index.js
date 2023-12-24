import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    }
  }
};

const server = new ApolloServer({
  // typeDefs
  typeDefs,
  // resolvers
  resolvers
});

const { url } = startStandaloneServer(server, {
  port: 4000
});

console.log("STARTING APOLLO SERVER ON PORT: 4000");
