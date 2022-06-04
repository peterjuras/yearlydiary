import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import AllAnswers from "../../../../../components/AllAnswers";
import Header from "../../../../../components/Header";
import QuestionDisplay from "../../../../../components/QuestionDisplay";

const AllPostsForDayPage: NextPage = () => {
  return (
    <Flex direction="column">
      <Header />
      <Flex direction="column" padding={4}>
        <QuestionDisplay />
        <AllAnswers />
      </Flex>
    </Flex>
  );
};

export default AllPostsForDayPage;
