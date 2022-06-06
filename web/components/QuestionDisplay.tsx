import { Flex, Heading } from "@chakra-ui/react";

interface QuestionDisplayProps {
  question: string;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  return (
    <Flex marginTop={10} marginBottom={10} justify="center">
      <Heading>{question}</Heading>
    </Flex>
  );
};

export default QuestionDisplay;
