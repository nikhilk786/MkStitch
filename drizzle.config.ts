import { defineConfig } from "drizzle-kit";
import { existsSync, readFileSync } from "node:fs";

function loadEnvFile(path: string) {
  if (!existsSync(path)) {
    return;
  }

  const envFile = readFileSync(path, "utf8");

  for (const line of envFile.split("\n")) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#")) {
      continue;
    }

    const equalsIndex = trimmedLine.indexOf("=");

    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmedLine
      .slice(0, equalsIndex)
      .replace(/^export\s+/, "")
      .trim();
    const value = trimmedLine
      .slice(equalsIndex + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");

    process.env[key] ??= value;
  }
}

function getDatabaseCredentials() {
  const databaseUrl = process.env.DATABASE_URL ?? process.env.STUDIO_DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is required. Add your Supabase Postgres URL to .env.local before running Drizzle commands.",
    );
  }

  try {
    const url = new URL(databaseUrl);

    return {
      host: url.hostname,
      port: url.port ? Number(url.port) : 5432,
      user: decodeURIComponent(url.username),
      password: decodeURIComponent(url.password),
      database: url.pathname.replace(/^\//, ""),
      ssl: "require" as const,
    };
  } catch {
    throw new Error("DATABASE_URL is not a valid Postgres connection string.");
  }
}

loadEnvFile(".env.local");

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: getDatabaseCredentials(),
  schemaFilter: ["public"],
});
