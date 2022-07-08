import { Flex } from "@chakra-ui/react";
import { useContext } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/client/fetcher";
import { PostDates } from "../types/post-dates";
import CalendarMonth from "./CalendarMonth";
import { UserContext } from "./UserContext";

const monthNumberOfDays: number[] = [
  31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
];

const Calendar: React.FC = () => {
  const { user } = useContext(UserContext);

  const getPostDatesUrl = `/api/users/${user?.userId}/posts`;

  const { data } = useSWR<{ postDates: PostDates }>(
    user?.userId ? getPostDatesUrl : null,
    fetcher
  );

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
