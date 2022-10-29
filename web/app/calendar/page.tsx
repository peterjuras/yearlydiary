import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import Calendar from "./Calendar";
import Header from "../Header";

type CalendarPageProps = {
  params: Record<string, string>;
};

const CalendarPage: NextPage<CalendarPageProps> = ({ params }) => {
  return (
    <Flex margin="0 auto" direction="column" height="100vh" maxWidth={800}>
      <Header hideCalendar closeRoute="/" hideDayNavigation params={params} />
      <Flex direction="column" padding={4} flex={1}>
        {/* @ts-expect-error React can't deal with async functions yet */}
        <Calendar />
      </Flex>
    </Flex>
  );
};

export default CalendarPage;
