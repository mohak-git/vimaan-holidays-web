import { serverEnv } from "@/config/env.server";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({ connectionString: serverEnv.DATABASE_URL });

export const db = drizzle(pool, { schema });
