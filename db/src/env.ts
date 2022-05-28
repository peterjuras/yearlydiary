if (!process.env.DATABASE_BASE_URL) {
  throw new Error("Environment variable DATABASE_BASE_URL must be defined!");
}
export const DB_URL = process.env.DATABASE_BASE_URL;
