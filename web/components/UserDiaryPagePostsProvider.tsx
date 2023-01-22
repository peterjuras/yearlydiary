import { getUserInfo, getUserPostsForDay } from "../lib/server/db";
import PostInput from "./PostInput";
import PreviousPosts from "./PreviousPosts";

type UserDiaryPagePostsProviderProps = {
  postsPromise: ReturnType<typeof getUserPostsForDay>;
  userInfoPromise: ReturnType<typeof getUserInfo>;
  month: number;
  day: number;
};

export default async function UserDiaryPagePostsProvider({
  userInfoPromise,
  postsPromise,
  month,
  day,
}: UserDiaryPagePostsProviderProps) {
  const [{ public_posts: publicPosts }, posts] = await Promise.all([
    userInfoPromise,
    postsPromise,
  ]);

  const currentYear = new Date().getFullYear();
  const storedPost = posts.find((post) => post.year === currentYear);
  const previousPosts = posts.filter((post) => post.year !== currentYear);

  return (
    <>
      <PostInput
        publicPosts={publicPosts}
        storedPost={storedPost}
        currentYear={currentYear}
        month={month}
        day={day}
      />
      <PreviousPosts posts={previousPosts} month={month} day={day} />
    </>
  );
}
