import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Answer } from "../types/answer";
import AnswerDisplay from "./AnswerDisplay";

interface PreviousAnswersProps {
  answers: Answer[];
}

const PreviousAnswers: React.FC<PreviousAnswersProps> = ({ answers }) => {
  const router = useRouter();
  const { day, month } = router.query;

  return (
    <Flex marginTop={5} direction="column">
      <Divider />
      {!answers.length && (
        <Text marginTop={5}>You don&apos;t have a previous answers yet</Text>
      )}
      {answers.map(({ answer, year }) => (
        <AnswerDisplay key={year} answer={answer} year={year} />
      ))}
      <Text marginTop={5}>Check out what others have answered today!</Text>
      <Link href={`/diary/${month}/${day}/all`}>
        <Button alignSelf="center" width={200} marginTop={5}>
          See other answers
        </Button>
      </Link>
    </Flex>
  );
};

export default PreviousAnswers;
