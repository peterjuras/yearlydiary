import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Header from "../components/Header";
import Settings from "../components/Settings";
import UserProvider from "../components/UserProvider";

const SettingsPage: NextPage = () => {
  return (
    <UserProvider disableAutomaticUserCreation>
      <Flex margin="0 auto" direction="column" height="100vh" maxWidth={800}>
        <Header closeRoute="/" hideDayNavigation />
        <Flex direction="column" padding={4} flex={1}>
          <Settings />
        </Flex>
      </Flex>
    </UserProvider>
  );
};

export default SettingsPage;
