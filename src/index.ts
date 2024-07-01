import { ApolloServer } from '@apollo/server';
// import { startStandaloneServer } from '@apollo/server/standalone';
import CountryResolver from './resolver/country.resolver';
import datasource from './lib/datasource';
import "reflect-metadata";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import express from "express";
import http from "http";
import cors from "cors";
import { buildSchema } from 'type-graphql';


const app = express();
const httpServer = http.createServer(app);

async function main() {
    const schema = await buildSchema({
        resolvers: [CountryResolver],
        validate: false,
    });
    const server = new ApolloServer<{}>({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    await server.start();
    app.use(
        "/",
        cors<cors.CorsRequest>({
            origin: ["http://localhost:3000", "https://studio.apollographql.com"],
        }),
        express.json(),
        expressMiddleware(server)
    );
    await datasource.initialize();
    await new Promise<void>((resolve) =>
        httpServer.listen({ port: 4000 }, resolve)
    );
}

main();