import "reflect-metadata";
import db from "./db";
// import boss from "./db-boss";
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
import { Any } from "typeorm";
import { HistoryResolver } from "./resolvers/historyResolver";
import { PageResolver } from "./resolvers/pageResolver";
import UserResolver from "./resolvers/userResolver";
import { Job } from "pg-boss";
import { RequestPage } from "./functions/axiosRequestPage";

export interface JWTPayload {
  userId: number;
}

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
}

// async function someAsyncJobHandler(job: Job) {
//   console.log(`job ${job.id} received with data:`);
//   console.log(JSON.stringify(job.data));

//   await console.log(job.data);
// }

async function requestJob(job: Job) {
  // console.log(`job ${job.id} received with data:`);
  // console.log(JSON.stringify(job.data));
  // const site = job.data.site;
  const site = (job.data as any).site;
  const result = await RequestPage(site);
  console.log(result);
  console.log(new Date());
}

async function start(): Promise<void> {
  console.log("Starting...");

  await db.initialize();

  // boss.on("error", (error: any) => console.error(error));

  // await boss.start();

  // // TEMP
  // // const queue = "some-queue";
  // const queueUn = "un";
  // const queueDeux = "deux";
  // // let jobId = await boss.send(queue, { param1: "foo" });
  // // console.log(`created job in queue ${queue}: ${jobId}`);
  // // await boss.work(queue, someAsyncJobHandler);
  // await boss.work(queueUn, requestJob);
  // await boss.work(queueDeux, requestJob);

  // await boss.schedule(
  //   "un",
  //   `* * * * *`,
  //   { site: "http://www.google.fr" },
  //   { tz: "Europe/Paris" }
  // );
  // await boss.schedule(
  //   "deux",
  //   `* * * * *`,
  //   { site: "http://www.dealabs.fr" },
  //   { tz: "Europe/Paris" }
  // );
  // // FIN TEMP

  const schema = await buildSchema({
    // resolvers: [join(__dirname, "/resolvers/*.ts")],
    resolvers: [HistoryResolver, PageResolver, UserResolver],
    authChecker: async (
      { context }: { context: ContextType },
      roles: number[] = []
    ) => {
      const {
        req: { headers },
      } = context;
      const tokenInAuthHeaders = headers.authorization?.split(" ")[1];
      const tokenInCookie = cookie.parse(headers.cookie ?? "").token;

      const token = tokenInAuthHeaders ?? tokenInCookie;

      if (typeof token === "string") {
        const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY) as JWTPayload;

        if (typeof decoded === "object") {
          const currentUser = await db.getRepository(User).findOne({
            relations: {
              pages: {
                histories: true,
              },
            },
            where: {
              id: decoded.userId,
            },
          });
          if (currentUser !== null) {
            context.currentUser = currentUser;
            return roles.length === 0 || roles.includes(currentUser.role);
          }
          return true;
        }
      }
      return false;
    },
  });

  const app = express();

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
      credentials: true,
    },
  });

  app.use("/screenshot", express.static(__dirname + "/screenshot"));

  app.get("/", (req, res) => {
    res.send("API HealthVisor 1.0");
  });

  app.get("*", function (req, res) {
    res.status(404).send("404 NOT FOUND :/");
  });

  app.listen({ port: 4000 }, () => {
    console.log(
      `🚀 Apollo Server ready at http://localhost:4000${server.graphqlPath}`
    );
    console.log(`📷 Screenshot available at http://localhost:4000/screenshot/`);
  });
}

start().catch(console.error);
