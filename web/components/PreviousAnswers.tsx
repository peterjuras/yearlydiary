import { Divider, Flex, Text } from "@chakra-ui/react";

const PreviousAnswers = () => {
  return (
    <Flex marginTop={5} direction="column">
      <Divider />
      <Text marginTop={5}>You don&apos;t have a previous answers yet</Text>
    </Flex>
  );
};

export default PreviousAnswers;
