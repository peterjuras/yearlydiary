import Header from "../Header";
import FlexClient from "../client-wrappers/FlexClient";
import CalendarDataProvider from "./CalendarDataProvider";

export default function CalendarPage() {
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
}
