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

export async function getUserPostsForDay(
  userId: string,
  day: number,
  month: number
): Promise<Readonly<{ answer: string; year: number }[]>> {
  const result = await db.query<{ answer: string; year: number }>(sql`
  SELECT ANSWER, YEAR FROM POSTS
  WHERE
  USER_ID = ${userId} AND
  DAY = ${day} AND
  MONTH = ${month}
  ORDER BY YEAR DESC
  `);

  return result.rows;
}

export async function getPostsForDay(
  day: number,
  month: number,
  offset: number
): Promise<Readonly<{ answer: string }[]>> {
  const results = await db.query<{ answer: string }>(sql`
  SELECT ANSWER, YEAR FROM POSTS
  WHERE
  DAY = ${day} AND
  MONTH = ${month}
  ORDER BY YEAR DESC
  LIMIT 20
  OFFSET ${offset}
  `);

  return results.rows;
}
