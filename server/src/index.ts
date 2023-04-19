import "reflect-metadata";
import db from "./db";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import { join } from "path";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { env } from "./env";
import User from "./entity/User";
import cookie from "cookie";

export interface JWTPayload {
  userId: number;
}

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
}

async function start(): Promise<void> {
  console.log("Starting...");

  await db.initialize();

  const schema = await buildSchema({
    resolvers: [join(__dirname, "/resolvers/*.ts")],
    authChecker: async ({ context }: { context: ContextType }) => {
      const {
        req: { headers },
      } = context;
      const tokenInAuthHeaders = headers.authorization?.split(" ")[1];
      const tokenInCookie = cookie.parse(headers.cookie ?? "").token;

      const token = tokenInAuthHeaders ?? tokenInCookie;

      if (typeof token === "string") {
        const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY) as JWTPayload;

        if (typeof decoded === "object") {
          const currentUser = await db
            .getRepository(User)
            .findOneBy({ id: decoded.userId });
          if (currentUser !== null) context.currentUser = currentUser;
          return true;
        }
      }
      return false;
    },
  });

  const app = express();

  // app.use(
  //   cors({
  //     origin: env.CORS_ALLOWED_ORIGINS.split(","),
  //     credentials: true,
  //   })
  // );

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    context: ({ req, res }) => ({ req, res }),
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: true,
      // origin: env.CORS_ALLOWED_ORIGINS.split(","),
      credentials: true
    },
  });

  app.use("/screenshot", express.static(__dirname + "/screenshot"));

  app.get("/", (req, res) => {
    res.send("API HealthVisor 1.0");
  });

  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Apollo Server ready at http://localhost:4000${server.graphqlPath}`
    );
    console.log(`📷 Screenshot available at http://localhost:4000/screenshot/`);
  });
}

start().catch(console.error);
