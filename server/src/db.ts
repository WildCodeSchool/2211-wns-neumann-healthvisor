import "dotenv/config";
import { DataSource } from "typeorm";
import { join } from "path";
import { env } from "./env";
import History from "./entity/History";
import Page from "./entity/Page";
import User from "./entity/User";

const datasource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASS,
  database: env.DB_NAME,
  synchronize: true,
  // entities: [join(__dirname, "/entity/*.ts")],
  entities: [History, Page, User],
  logging: ["query", "error"],
});

export default datasource;
