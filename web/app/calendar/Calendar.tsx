import { getPostDatesForUser } from "../../lib/server/db";
import FlexClient from "../client-wrappers/FlexClient";
import CalendarMonth from "./CalendarMonth";

const monthNumberOfDays: number[] = [
  31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,
];

type CalendarProps = {
  postDatesPromise?: ReturnType<typeof getPostDatesForUser>;
};

export default async function Calendar({ postDatesPromise }: CalendarProps) {
  let postDates: Awaited<typeof postDatesPromise>;

  if (postDatesPromise) {
    postDates = await postDatesPromise;
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
        postDates={postDates?.[month]}
        monthLabel={monthLabel}
        numberOfDays={numberOfDays}
      />
    );
  });

  return <FlexClient direction="column">{monthViews}</FlexClient>;
}
