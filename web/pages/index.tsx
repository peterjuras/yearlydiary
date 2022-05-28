import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import AnswerInput from "../components/AnswerInput";
import DateProvider from "../components/DateProvider";
import Header from "../components/Header";
import PreviousAnswers from "../components/PreviousAnswers";
import QuestionDisplay from "../components/QuestionDisplay";
import UserProvider from "../components/UserProvider";

const Home: NextPage = () => {
  return (
    <DateProvider>
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
    </DateProvider>
  );
};

export default Home;
