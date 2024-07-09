// src/server.js

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import typeDefs from './schema/index.js';
import resolvers from './resolvers/index.js';
import connectDB from './db/index.js';

dotenv.config();

async function startApolloServer() {
    // Connect to MongoDB
    await connectDB();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const app = express();
    app.use(cors());
    app.use(bodyParser.json());

    await server.start();

    app.use("/graphql", expressMiddleware(server));

    app.listen({ port: 8000 }, () =>
        console.log(`🚀 Server ready at http://localhost:8000/graphql`)
    );
}

export default startApolloServer;
