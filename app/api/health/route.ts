import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getConfigStatus } from "@/lib/env";

export async function GET() {
  const config = getConfigStatus();
  let databaseReachable: boolean | null = null;

  if (config.database) {
    try {
      const db = getDb();
      if (!db) {
        databaseReachable = false;
      } else {
        await db.execute(sql`select 1`);
        databaseReachable = true;
      }
    } catch {
      databaseReachable = false;
    }
  }

  return NextResponse.json({
    ok: true,
    service: "app-starter",
    timestamp: new Date().toISOString(),
    config,
    databaseReachable,
  });
}
