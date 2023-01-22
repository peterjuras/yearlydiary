import Link from "next/link";
import ButtonClient from "../app/client-wrappers/ButtonClient";
import DividerClient from "../app/client-wrappers/DividerClient";
import FlexClient from "../app/client-wrappers/FlexClient";
import TextClient from "../app/client-wrappers/TextClient";
import { Post } from "../types/post";
import PostDisplay from "./PostDisplay";

interface PreviousPostsProps {
  posts: Post[];
  day: number;
  month: number;
}

const PreviousPosts: React.FC<PreviousPostsProps> = ({ posts, day, month }) => {
  return (
    <FlexClient marginTop={5} direction="column">
      <DividerClient />
      {!posts.length && (
        <TextClient marginTop={5}>
          You don&apos;t have any previous answers yet
        </TextClient>
      )}
      {posts.map(({ answer, year }) => (
        <PostDisplay key={year} answer={answer} year={year} />
      ))}
      <TextClient marginTop={5}>
        Check out what others have answered today!
      </TextClient>
      <Link
        style={{ alignSelf: "center" }}
        href={`/diary/${month + 1}/${day}/all`}
      >
        <ButtonClient width={200} marginTop={5}>
          See other answers
        </ButtonClient>
      </Link>
    </FlexClient>
  );
};

export default PreviousPosts;
