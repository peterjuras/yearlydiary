import { main as bootstrapDatabase } from "./bootstrap-database";

const DB_CONTAINER_NAME = "yearlydiary-local-db";
const DB_VOLUME_NAME = "yearlydiary-local-db-vol";

async function main() {
  const { execa } = await import("execa");

  // Stop current database container if it is running
  await execa("docker", ["rm", "-f", DB_CONTAINER_NAME]);

  // Create docker volume for the database container
  await execa("docker", ["volume", "create", "--name", DB_VOLUME_NAME]);

  // Start container
  await execa(
    "docker",
    [
      "run",
      "-d",
      "--rm",
      "--env",
      "POSTGRES_PASSWORD=postgres",
      "-p",
      "5432:5432",
      "--volume",
      `${DB_VOLUME_NAME}:/var/lib/postgresql/data`,
      "--name",
      DB_CONTAINER_NAME,
      "postgres:14",
    ],
    {
      stdio: "inherit",
    }
  );

  await bootstrapDatabase();
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
