import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";
import db from "./_db.js";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    }
  },
  //Resolver for a single game object which will be called after the query
  Game: {
    reviews(parent) {
      return db.reviews.filter((eachR) => eachR.game_id === parent.id);
    }
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((eachR) => eachR.author_id === parent.id);
    }
  },
  Review: {
    game(parent) {
      return db.games.find((eachG) => eachG.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find((eachA) => eachA.id === parent.author_id);
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
