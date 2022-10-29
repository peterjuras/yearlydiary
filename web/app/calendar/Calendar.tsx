import { Flex } from "@chakra-ui/react";
import { cookies } from "next/headers";
import { PostDates } from "../../types/post-dates";
import CalendarMonth from "./CalendarMonth";

const monthNumberOfDays: number[] = [
  31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
];

const Calendar = async () => {
  const userId = cookies().get("userId");

  let data: { postDates: PostDates };

  if (userId) {
    const getPostDatesUrl = `/api/users/${userId}/posts`;
    const response = await fetch(getPostDatesUrl);
    data = await response.json();
  }

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
        postDates={data?.postDates?.[month]}
        monthLabel={monthLabel}
        numberOfDays={numberOfDays}
      />
    );
  });

  return <Flex direction="column">{monthViews}</Flex>;
};

export default Calendar;
