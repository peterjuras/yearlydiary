import FlexClient from "../app/client-wrappers/FlexClient";
import HeadingClient from "../app/client-wrappers/HeadingClient";

interface QuestionDisplayProps {
  question: string;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  return (
    <FlexClient marginTop={10} marginBottom={10} justify="center">
      <HeadingClient>{question}</HeadingClient>
    </FlexClient>
  );
};

export default QuestionDisplay;
