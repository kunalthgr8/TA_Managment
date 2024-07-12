import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import typeDefs from "./typeDefs/index.js";
import resolvers from "./resolvers/index.js";
import connectDB from "./db/index.js";
import authentication from "./middlewares/authentication.js";
import conf from "../conf/conf.js";

dotenv.config();

async function startApolloServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: async ({ req, res }) => {
          const user = await authentication(req);
          return { req, res, user };
        },
      })
    );

    const httpServer = http.createServer(app);

    const PORT = process.env.PORT || 8000;
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${conf.port}/graphql`);
    });
  } catch (error) {
    console.error("Error starting Apollo Server:", error);
    process.exit(1);
  }
}

startApolloServer();
