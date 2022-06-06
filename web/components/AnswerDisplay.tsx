import { Flex, Text } from "@chakra-ui/react";

interface AnswerDisplayProps {
  answer: string;
  year: number;
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ answer, year }) => {
  return (
    <Flex
      paddingBottom={10}
      direction="column"
      alignItems="center"
      paddingLeft={5}
      paddingRight={5}
      marginBottom={4}
      boxShadow="outline"
      rounded="md"
    >
      <Text marginBottom={5} fontSize="smaller">
        {year}
      </Text>
      <Text>{answer}</Text>
    </Flex>
  );
};

export default AnswerDisplay;
