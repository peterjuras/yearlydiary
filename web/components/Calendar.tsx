import { Flex } from "@chakra-ui/react";
import CalendarMonth from "./CalendarMonth";

const monthNumberOfDays: number[] = [
  31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
];

const Calendar: React.FC = () => {
  const monthViews = monthNumberOfDays.map((numberOfDays, month) => {
    const monthDate = new Date();
    monthDate.setDate(1);
    monthDate.setMonth(month);
    const monthLabel = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(monthDate);
    return (
      <CalendarMonth
        key={month}
        month={month}
        monthLabel={monthLabel}
        numberOfDays={numberOfDays}
      />
    );
  });

  return <Flex direction="column">{monthViews}</Flex>;
};

export default Calendar;
