import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import postgres from "postgres";

const envPath = ".env.local";
const roleName = "clothweb_studio";

function loadEnvValue(key) {
  if (!existsSync(envPath)) {
    return undefined;
  }

  const envFile = readFileSync(envPath, "utf8");
  const match = envFile.match(new RegExp(`^${key}=(.*)$`, "m"));

  return match?.[1]?.trim().replace(/^['"]|['"]$/g, "");
}

function quoteIdent(value) {
  return `"${value.replace(/"/g, '""')}"`;
}

function quoteLiteral(value) {
  return `'${value.replace(/'/g, "''")}'`;
}

function upsertEnvValue(key, value) {
  const envFile = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";
  const line = `${key}="${value}"`;
  const nextEnvFile = new RegExp(`^${key}=.*$`, "m").test(envFile)
    ? envFile.replace(new RegExp(`^${key}=.*$`, "m"), line)
    : `${envFile.trimEnd()}\n${line}\n`;

  writeFileSync(envPath, nextEnvFile);
}

const databaseUrl = loadEnvValue("DATABASE_URL");

if (!databaseUrl) {
  throw new Error("DATABASE_URL missing in .env.local");
}

const password = randomBytes(24).toString("base64url");
const sql = postgres(databaseUrl, { max: 1, prepare: false });

try {
  await sql.unsafe(`
    do $$
    begin
      if not exists (select 1 from pg_roles where rolname = ${quoteLiteral(roleName)}) then
        create role ${quoteIdent(roleName)} login password ${quoteLiteral(password)};
      else
        alter role ${quoteIdent(roleName)} with login password ${quoteLiteral(password)};
      end if;
    end
    $$;
  `);

  await sql.unsafe(`grant usage on schema public to ${quoteIdent(roleName)};`);
  await sql.unsafe(
    `grant select, insert, update, delete on all tables in schema public to ${quoteIdent(roleName)};`,
  );
  await sql.unsafe(
    `grant usage, select on all sequences in schema public to ${quoteIdent(roleName)};`,
  );
  await sql.unsafe(
    `alter default privileges in schema public grant select, insert, update, delete on tables to ${quoteIdent(roleName)};`,
  );
  await sql.unsafe(
    `alter default privileges in schema public grant usage, select on sequences to ${quoteIdent(roleName)};`,
  );
  await sql.unsafe(`alter role ${quoteIdent(roleName)} set search_path = public;`);
} finally {
  await sql.end();
}

const studioUrl = new URL(databaseUrl);
const tenantSuffix = decodeURIComponent(studioUrl.username).replace(/^[^.]+/, "");

studioUrl.username = `${roleName}${tenantSuffix}`;
studioUrl.password = password;
studioUrl.searchParams.set("sslmode", "require");

upsertEnvValue("STUDIO_DATABASE_URL", studioUrl.toString());

console.log("Created/updated public-only Drizzle Studio user.");
