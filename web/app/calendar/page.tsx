import { NextPage } from "next";
import Header from "../Header";
import FlexClient from "../client-wrappers/FlexClient";
import CalendarDataProvider from "./CalendarDataProvider";

type CalendarPageProps = {
  params: Record<string, string>;
};

const CalendarPage: NextPage<CalendarPageProps> = ({ params }) => {
  return (
    <FlexClient
      margin="0 auto"
      direction="column"
      height="100vh"
      maxWidth={800}
    >
      <Header hideCalendar closeRoute="/" hideDayNavigation />
      <FlexClient direction="column" padding={4} flex={1}>
        <CalendarDataProvider />
      </FlexClient>
    </FlexClient>
  );
};

export default CalendarPage;
