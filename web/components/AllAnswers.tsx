import { Flex, Text } from "@chakra-ui/react";
import { Answer } from "../types/answer";
import AnswerDisplay from "./AnswerDisplay";
interface AllAnswersProps {
  answers: Answer[];
}

const AllAnswers: React.FC<AllAnswersProps> = ({ answers }) => {
  return (
    <Flex direction="column">
      {!answers.length && <Text>There are no answers yet.</Text>}
      {answers.map(({ answer, year }, index) => (
        <AnswerDisplay key={index} answer={answer} year={year} />
      ))}
    </Flex>
  );
};

export default AllAnswers;
