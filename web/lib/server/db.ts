import { createPool, sql } from "slonik";
import { v4 as uuid } from "uuid";
import { PostDates } from "../../types/post-dates";
import { UserEntryRow } from "../../types/user-entry-row";
import { UserPostRow } from "../../types/user-post-row";

if (!process.env.DATABASE_URL) {
  throw new Error("Environment variable DATABASE_URL must be defined");
}
const DATABASE_URL = process.env.DATABASE_URL;

const db = createPool(DATABASE_URL);

export async function createUser(): Promise<{
  userId: string;
  publicPosts: boolean;
}> {
  const newUserId = uuid();
  const publicPosts = true;

  await db.query(sql`
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
  await db.query(sql`
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
  await db.query(sql`
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
): Promise<Readonly<{ answer: string; year: number }[]>> {
  const result = await db.query<{ answer: string; year: number }>(sql`
  SELECT ANSWER, YEAR FROM POSTS
  WHERE
  USER_ID = (SELECT ID FROM USERS WHERE USER_ID = ${userId})
  AND
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
  const results = await db.query<{ month: number; day: number }>(sql`
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
  await db.query(sql`
    DELETE FROM USERS WHERE USER_ID = ${userId}
  `);
}

export async function getUserEntry(userId: string): Promise<UserEntryRow> {
  const result = await db.one<UserEntryRow>(sql`
  SELECT USER_ID, PUBLIC_POSTS, CREATED_AT FROM USERS WHERE USER_ID = ${userId}
  `);

  return result;
}

export async function getUserPosts(
  userId: string,
  offset: number,
  limit: number
): Promise<readonly UserPostRow[]> {
  const result = await db.query<UserPostRow>(sql`
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
  await db.query(sql`
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

export async function getUserInfoFromSetupCode(setupCode: string) {
  const result = await db.maybeOne<{
    user_id: string;
    public_posts: boolean;
  }>(sql`
    SELECT USERS.USER_ID, PUBLIC_POSTS FROM USERS JOIN SETUP_CODES
    ON USERS.ID = SETUP_CODES.USER_ID
    WHERE CODE = ${setupCode} AND
    EXPIRES_AT > NOW()
  `);
  return result;
}
