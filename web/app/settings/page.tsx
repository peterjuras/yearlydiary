"use client";

import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Settings from "../../components/Settings";
import Header from "../Header";

const SettingsPage: NextPage = () => {
  return (
    <Flex margin="0 auto" direction="column" height="100vh" maxWidth={800}>
      <Header closeRoute="/" hideDayNavigation />
      <Flex direction="column" padding={4} flex={1}>
        <Settings />
      </Flex>
    </Flex>
  );
};

export default SettingsPage;
