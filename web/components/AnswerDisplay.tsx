import { Flex, Text } from "@chakra-ui/react";

interface AnswerDisplayProps {
  answer: string;
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ answer }) => {
  return (
    <Flex
      paddingTop={10}
      paddingBottom={10}
      paddingLeft={5}
      paddingRight={5}
      marginBottom={4}
      boxShadow="outline"
      rounded="md"
    >
      <Text>{answer}</Text>
    </Flex>
  );
};

export default AnswerDisplay;
