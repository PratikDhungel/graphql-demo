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
  },

  Mutation: {
    addGame(_, args) {
      const newGame = {
        ...args.newGame,
        id: Math.floor(Math.random() * 10000).toString()
      };

      db.games.push(newGame);

      return newGame;
    },

    updateGame(_, args) {
      let updatedGame = null;

      db.games = db.games.map((eachG) => {
        if (eachG.id === args.id) {
          updatedGame = { ...eachG, ...args.updatedData };
          return updatedGame;
        }

        return eachG;
      });

      return updatedGame;
    },

    deleteGame(_, args) {
      return db.games.filter((eachG) => eachG.id !== args.id);
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
