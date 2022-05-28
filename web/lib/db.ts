import { createPool, sql } from "slonik";

if (!process.env.DATABASE_URL) {
  throw new Error("Environment variable DATABASE_URL must be defined");
}
const DATABASE_URL = process.env.DATABASE_URL;

const db = createPool(DATABASE_URL);

export async function storePost(
  userId: string,
  day: number,
  month: number,
  year: number,
  answer: string
): Promise<void> {
  await db.query(sql`
    INSERT INTO POSTS
    (USER_ID, DAY, MONTH, YEAR, ANSWER)
    VALUES
    (${userId}, ${day}, ${month}, ${year}, ${answer})
  `);
}
