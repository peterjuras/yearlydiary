import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import AnswerInput from "../../../../components/AnswerInput";
import Header from "../../../../components/Header";
import PreviousAnswers from "../../../../components/PreviousAnswers";
import QuestionDisplay from "../../../../components/QuestionDisplay";
import UserProvider from "../../../../components/UserProvider";

const Day: NextPage = () => {
  return (
    <UserProvider>
      <Flex direction="column">
        <Header />
        <Flex direction="column" padding={4}>
          <QuestionDisplay />
          <AnswerInput />
          <PreviousAnswers />
        </Flex>
      </Flex>
    </UserProvider>
  );
};

export default Day;
