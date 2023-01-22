import AllPostsDiaryPage from "../../../../../components/AllPostsDiaryPage";
import { questions } from "../../../../../lib/server/questions";
import FlexClient from "../../../../client-wrappers/FlexClient";
import Header from "../../../../Header";

type AllPostsForDayPageProps = {
  params: Record<string, string>;
};

export default function AllPostsForDayPage({
  params,
}: AllPostsForDayPageProps) {
  const { day: dayText, month: monthText } = params;
  const closeRoute = `/diary/${monthText}/${dayText}`;

  const day = parseInt(dayText, 10);
  const month = parseInt(monthText, 10) - 1;

  return (
    <FlexClient
      direction="column"
      height="100vh"
      maxWidth={800}
      margin="0 auto"
    >
      <Header
        routeSuffix="/all"
        closeRoute={closeRoute}
        month={month}
        day={day}
      />
      <FlexClient direction="column" padding={4} flex={1}>
        <AllPostsDiaryPage day={day} month={month} />
      </FlexClient>
    </FlexClient>
  );
}

export function generateStaticParams() {
  const params = [];
  for (const [monthText, days] of Object.entries(questions)) {
    const month = parseInt(monthText, 10) + 1;
    for (const day of Object.keys(days)) {
      params.push({ month: `${month}`, day });
    }
  }
  return params;
}

export const dynamicParams = true;
export const revalidate = 60;
