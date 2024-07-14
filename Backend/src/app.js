import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import cookieParser from "cookie-parser";
import typeDefs from "./typeDefs/index.js";
import resolvers from "./resolvers/index.js";
import connectDB from "./db/index.js";
import authentication from "./middlewares/authentication.middleware.js";

dotenv.config();

export async function startApolloServer() {
  try {
    // Connect to MongoDB
    await connectDB();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    await server.start();

    const app = express();
    app.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
      })
    );
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(
      "/graphql",
      async (req, res, next) => {
        // Skip authentication for the login route
        const loginRoute = req.body.query.includes("loginUser");
        const registerUser = req.body.query.includes("registerUser");
        if (!loginRoute && !registerUser) {
          try {
            const user = await authentication(req);
            req.user = user;
          } catch (error) {
            // Handle authentication errors
            return res.status(401).json({ message: "Unauthorized" });
          }
        }
        next();
      },
      expressMiddleware(server, {
        context: ({ req, res }) => ({ req, res, user: req.user }),
      })
    );

    const httpServer = http.createServer(app);

    const PORT = process.env.PORT || 8000;
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Error starting Apollo Server:", error);
    process.exit(1);
  }
}
