import FlexClient from "../app/client-wrappers/FlexClient";
import TextClient from "../app/client-wrappers/TextClient";
import { Post } from "../types/post";
import PostDisplay from "./PostDisplay";
interface AllPostsProps {
  posts: readonly Post[];
}

const AllPosts: React.FC<AllPostsProps> = ({ posts }) => {
  return (
    <FlexClient direction="column">
      {!posts.length && <TextClient>There are no answers yet.</TextClient>}
      {posts.map(({ answer, year }, index) => (
        <PostDisplay key={index} answer={answer} year={year} />
      ))}
    </FlexClient>
  );
};

export default AllPosts;
