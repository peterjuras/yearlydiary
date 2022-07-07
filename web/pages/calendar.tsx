import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Calendar from "../components/Calendar";
import Header from "../components/Header";
import UserProvider from "../components/UserProvider";

const CalendarPage: NextPage = () => {
  return (
    <UserProvider>
      <Flex margin="0 auto" direction="column" height="100vh" maxWidth={800}>
        <Header hideCalendar closeRoute="/" hideDayNavigation />
        <Flex direction="column" padding={4} flex={1}>
          <Calendar />
        </Flex>
      </Flex>
    </UserProvider>
  );
};

export default CalendarPage;
