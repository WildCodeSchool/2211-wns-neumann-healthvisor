import "dotenv/config";
import { env } from "./env";
import PgBoss from 'pg-boss';

const boss = new PgBoss(`postgres://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}/${env.DB_NAME}`);

export default boss;