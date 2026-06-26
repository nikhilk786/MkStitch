import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/lib/db/schema";

const globalForDb = globalThis as unknown as {
  postgresClient?: postgres.Sql;
  postgresClientUrl?: string;
};

function getDatabaseUrl() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is required to connect to Supabase Postgres.");
  }

  try {
    const url = new URL(connectionString);

    if (
      url.hostname.includes("supabase.com") &&
      !url.searchParams.has("sslmode")
    ) {
      url.searchParams.set("sslmode", "require");
    }

    return url.toString();
  } catch {
    throw new Error("DATABASE_URL is not a valid Postgres connection string.");
  }
}

const connectionString = getDatabaseUrl();

const client =
  globalForDb.postgresClientUrl === connectionString && globalForDb.postgresClient
    ? globalForDb.postgresClient
    : postgres(connectionString, {
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.postgresClient = client;
  globalForDb.postgresClientUrl = connectionString;
}

export const db = drizzle(client, { schema });

export function assertDatabaseUrl() {
  getDatabaseUrl();
}
