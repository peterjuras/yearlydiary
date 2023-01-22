import execa from "execa";

const LOCAL_DB_URL =
  "postgresql://postgres:postgres@localhost:5432/yearlydiary";

async function main() {
  // Ensure local db is running
  console.log("Starting database");

  await execa("yarn", ["--cwd", "../db", "start-local-db"], {
    env: {
      NODE_ENV: "development",
      DATABASE_URL: LOCAL_DB_URL,
    },
  });

  console.log("Starting web server");
  await execa("yarn", ["dev", "-p", "9234"], {
    env: {
      NODE_ENV: "development",
      NEXT_PUBLIC_E2E_TESTS_ACTIVE: "true",
      DATABASE_URL: LOCAL_DB_URL,
    },
  });
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
