import { Flex } from "@chakra-ui/react";
import type { NextPage } from "next";
import Header from "../../../components/Header";
import UserDiaryPage from "../../../components/UserDiaryPage";
import UserProvider from "../../../components/UserProvider";

const Day: NextPage = () => {
  return (
    <UserProvider>
      <Flex direction="column" height="100vh">
        <Header />
        <Flex direction="column" padding={4} flex={1}>
          <UserDiaryPage />
        </Flex>
      </Flex>
    </UserProvider>
  );
};

export default Day;
