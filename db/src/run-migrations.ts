import migrate from "node-pg-migrate";
import path from "node:path";
import { DB_URL } from "./env";

export async function main(): Promise<void> {
  await migrate({
    databaseUrl: DB_URL,
    migrationsTable: "pgmigrations",
    dir: path.join(__dirname, "migrations"),
    direction: "up",
  });
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
