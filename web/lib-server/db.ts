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

export async function getPost(
  userId: string,
  day: number,
  month: number,
  year: number
): Promise<string | null> {
  const result = await db.maybeOne<{ answer: string }>(sql`
  SELECT ANSWER FROM POSTS
  WHERE
  USER_ID = ${userId} AND
  DAY = ${day} AND
  MONTH = ${month} AND
  YEAR = ${year}
  `);

  return result?.answer || null;
}

export async function getPosts(
  day: number,
  month: number,
  year: number,
  offset: number
): Promise<Readonly<{ answer: string }[]>> {
  const results = await db.query<{ answer: string }>(sql`
  SELECT ANSWER FROM POSTS
  WHERE
  DAY = ${day} AND
  MONTH = ${month} AND
  YEAR = ${year}
  LIMIT 20
  OFFSET ${offset}
  `);

  return results.rows;
}
