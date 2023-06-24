import { createPool, DatabasePool, sql } from "slonik";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { PostDates } from "../../types/post-dates";
import { User } from "../../types/user";
import { Post, postSchema } from "../../types/post";

if (!process.env.DATABASE_URL) {
  throw new Error("Environment variable DATABASE_URL must be defined");
}
const DATABASE_URL = process.env.DATABASE_URL;

let dbPool: DatabasePool;

async function getDb(): Promise<DatabasePool> {
  if (!dbPool) {
    dbPool = await createPool(DATABASE_URL);
  }
  return dbPool;
}

export async function createUser(): Promise<User> {
  const newUserId = uuid();
  const publicPosts = true;

  const db = await getDb();

  await db.query(sql.unsafe`
    INSERT INTO USERS
    (USER_ID, PUBLIC_POSTS)
    VALUES
    (${newUserId}, ${publicPosts})
  `);

  return {
    userId: newUserId,
    publicPosts,
  };
}

export async function updateUser(
  userId: string,
  publicPosts: boolean
): Promise<void> {
  const db = await getDb();

  await db.query(sql.unsafe`
  UPDATE USERS
  SET PUBLIC_POSTS = ${publicPosts}
  WHERE USER_ID = ${userId}
  `);
}

export async function storePost(
  userId: string,
  day: number,
  month: number,
  year: number,
  answer: string
): Promise<void> {
  const db = await getDb();

  await db.query(sql.unsafe`
    INSERT INTO POSTS
    (USER_ID, DAY, MONTH, YEAR, ANSWER)
    VALUES (
    (SELECT ID FROM USERS WHERE USER_ID = ${userId}),
    ${day}, ${month}, ${year}, ${answer}
    )
  `);
}

export async function getUserPostsForDay(
  userId: string,
  day: number,
  month: number
): Promise<Readonly<Post[]>> {
  const db = await getDb();

  const result = await db.query(
    sql.type(postSchema)`
  SELECT ANSWER, YEAR FROM POSTS
  WHERE
  USER_ID = (SELECT ID FROM USERS WHERE USER_ID = ${userId})
  AND
  DAY = ${day} AND
  MONTH = ${month}
  ORDER BY YEAR DESC
  `
  );

  return result.rows;
}

export async function getPostsForDay(
  day: number,
  month: number,
  offset: number
): Promise<Readonly<{ answer: string; year: number }[]>> {
  const db = await getDb();

  const results = await db.query(sql.type(
    z.object({
      answer: z.string(),
      year: z.number(),
    })
  )`
  SELECT ANSWER, YEAR FROM POSTS JOIN USERS ON POSTS.USER_ID = USERS.ID
  WHERE
  PUBLIC_POSTS = TRUE AND
  DAY = ${day} AND
  MONTH = ${month}
  ORDER BY YEAR DESC
  LIMIT 20
  OFFSET ${offset}
  `);

  return results.rows;
}

export async function getPostDatesForUser(userId: string): Promise<PostDates> {
  const db = await getDb();

  const results = await db.query(sql.type(
    z.object({
      month: z.number(),
      day: z.number(),
    })
  )`
  SELECT DISTINCT MONTH, DAY FROM POSTS JOIN USERS ON POSTS.USER_ID = USERS.ID
  WHERE
  USERS.USER_ID = ${userId}
  `);

  const postDates = results.rows.reduce<PostDates>((acc, { month, day }) => {
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(day);
    return acc;
  }, {});

  return postDates;
}

export async function deleteUser(userId: string) {
  const db = await getDb();

  await db.query(sql.unsafe`
    DELETE FROM USERS WHERE USER_ID = ${userId}
  `);
}

export async function getUserEntry(userId: string) {
  const db = await getDb();

  const result = await db.one(sql.type(
    z.object({
      user_id: z.string(),
      public_posts: z.boolean(),
      created_at: z.number(),
    })
  )`
  SELECT USER_ID, PUBLIC_POSTS, CREATED_AT FROM USERS WHERE USER_ID = ${userId}
  `);

  return result;
}

export async function getUserPosts(
  userId: string,
  offset: number,
  limit: number
) {
  const db = await getDb();

  const result = await db.query(sql.type(
    z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
      answer: z.string(),
      created_at: z.number(),
    })
  )`
  SELECT DAY, MONTH, YEAR, ANSWER, POSTS.CREATED_AT FROM POSTS JOIN USERS ON POSTS.USER_ID = USERS.ID
  WHERE
  USERS.USER_ID = ${userId}
  LIMIT ${limit}
  OFFSET ${offset}
  `);

  return result.rows;
}

export async function insertSetupCode(
  userId: string,
  code: string,
  expiryDate: Date
) {
  const db = await getDb();

  await db.query(sql.unsafe`
    INSERT INTO SETUP_CODES
    (USER_ID, CODE, EXPIRES_AT)
    VALUES
    (
      (SELECT ID FROM USERS WHERE USER_ID = ${userId}),
      ${code},
      TO_TIMESTAMP(${expiryDate.getTime() / 1000})
    )
  `);
}

export async function getUserInfo(userId: string) {
  const db = await getDb();

  const result = await db.one(sql.type(z.object({ public_posts: z.boolean() }))`
    SELECT PUBLIC_POSTS FROM USERS
    WHERE USER_ID = ${userId}
  `);

  return result;
}

export async function getUserInfoFromSetupCode(setupCode: string) {
  const db = await getDb();

  const result = await db.maybeOne(sql.type(
    z.object({
      user_id: z.string(),
      public_posts: z.boolean(),
    })
  )`
    SELECT USERS.USER_ID, PUBLIC_POSTS FROM USERS JOIN SETUP_CODES
    ON USERS.ID = SETUP_CODES.USER_ID
    WHERE CODE = ${setupCode} AND
    EXPIRES_AT > NOW()
  `);
  return result;
}

export async function ciWarmup() {
  const db = await getDb();

  await db.query(sql.unsafe`SELECT`);
}
