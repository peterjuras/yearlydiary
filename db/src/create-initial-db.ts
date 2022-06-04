import migrate from "node-pg-migrate";
import path from "node:path";
import { DB_URL } from "./env";

export async function main(): Promise<void> {
  // Strip database from postgres connection string
  const databaseUrlWithoutDb = DB_URL.split("/").slice(0, -1).join("/");

  await migrate({
    databaseUrl: `${databaseUrlWithoutDb}/postgres`,
    migrationsTable: "pgmigrations",
    dir: path.join(__dirname, "create-db-migrations"),
    direction: "up",
  });
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
