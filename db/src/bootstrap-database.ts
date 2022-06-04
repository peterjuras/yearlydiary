import { main as createInitialDb } from "./create-initial-db";
import { main as runMigrations } from "./run-migrations";
import retry from "promise-retry";

export async function main() {
  // Run migrations to create initial yearlydiary database
  await retry(async (retry) => {
    try {
      await createInitialDb();
    } catch (error) {
      retry(error);
    }
  });

  // Run migrations
  await runMigrations();
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
