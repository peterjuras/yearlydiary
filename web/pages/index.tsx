import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import AnswerInput from "../components/AnswerInput";
import DateProvider from "../components/DateProvider";
import Header from "../components/Header";
import PreviousAnswers from "../components/PreviousAnswers";
import QuestionDisplay from "../components/QuestionDisplay";

const Home: NextPage = () => {
  return (
    <DateProvider>
      <Flex direction="column">
        <Header />
        <Flex direction="column" padding={4}>
          <QuestionDisplay />
          <AnswerInput />
          <PreviousAnswers />
        </Flex>
      </Flex>
    </DateProvider>
  );
};

export default Home;
