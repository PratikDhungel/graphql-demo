export const typeDefs = `#graphql

    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating: Int!
        content: String!
        author_id: String!
        game_id: String!
        game: Game!
        author: Author!
    }

    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }

    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }

    type Mutation {
        addGame(newGame: NewGameInput!): Game

        updateGame(id: ID!, updatedData: UpdateGameInput): Game

        deleteGame(id: ID!): [Game]
    }

    input NewGameInput {
        title: String!
        platform: [String!]!
    }

    input UpdateGameInput {
        title: String
        platform: [String!]
    }

`;
