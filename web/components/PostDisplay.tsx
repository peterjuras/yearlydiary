import FlexClient from "../app/client-wrappers/FlexClient";
import TextClient from "../app/client-wrappers/TextClient";

interface PostDisplayProps {
  answer: string;
  year: number;
}

const PostDisplay: React.FC<PostDisplayProps> = ({ answer, year }) => {
  return (
    <FlexClient
      paddingBottom={10}
      direction="column"
      alignItems="center"
      paddingLeft={5}
      paddingRight={5}
      marginBottom={4}
      boxShadow="outline"
      rounded="md"
    >
      <TextClient marginBottom={5} fontSize="smaller">
        {year}
      </TextClient>
      <TextClient>{answer}</TextClient>
    </FlexClient>
  );
};

export default PostDisplay;
