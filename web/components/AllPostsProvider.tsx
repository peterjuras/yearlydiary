import { getPostsForDay } from "../lib/server/db";
import AllPosts from "./AllPosts";

type AllPostsProviderProps = {
  allPostsPromise: ReturnType<typeof getPostsForDay>;
};

export default async function AllPostsProvider({
  allPostsPromise,
}: AllPostsProviderProps) {
  const allPosts = await allPostsPromise;

  return <AllPosts posts={allPosts} />;
}
