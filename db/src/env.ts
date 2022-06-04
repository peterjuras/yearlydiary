if (!process.env.DATABASE_URL) {
  throw new Error("Environment variable DATABASE_URL must be defined!");
}
export const DB_URL = process.env.DATABASE_URL;
