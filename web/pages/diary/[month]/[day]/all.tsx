import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import AllAnswersDiaryPage from "../../../../components/AllAnswersDiaryPage";
import Header from "../../../../components/Header";

const AllPostsForDayPage: NextPage = () => {
  return (
    <Flex direction="column" height="100vh">
      <Header />
      <Flex direction="column" padding={4} flex={1}>
        <AllAnswersDiaryPage />
      </Flex>
    </Flex>
  );
};

export default AllPostsForDayPage;
