import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { isDatabaseConfigured } from "@/lib/env";
import * as schema from "./schema";

export type Database = NeonHttpDatabase<typeof schema>;

let cached: Database | null | undefined;

/**
 * Returns a Drizzle client when DATABASE_URL is set; otherwise null.
 * Callers must handle null and surface a clear error.
 */
export function getDb(): Database | null {
  if (!isDatabaseConfigured()) {
    return null;
  }

  if (cached !== undefined) {
    return cached;
  }

  const sql = neon(process.env.DATABASE_URL!);
  cached = drizzle(sql, { schema });
  return cached;
}

export function requireDb(): Database {
  const db = getDb();
  if (!db) {
    throw new Error(
      "DATABASE_URL is not set. Add a Neon connection string to .env.local (see .env.example).",
    );
  }
  return db;
}
