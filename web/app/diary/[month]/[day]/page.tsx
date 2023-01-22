import UserDiaryPage from "../../../../components/UserDiaryPage";
import FlexClient from "../../../client-wrappers/FlexClient";
import Header from "../../../Header";

type DiaryPageProps = {
  params: Record<string, string>;
};

export default function DiaryPage({ params }: DiaryPageProps) {
  const { day: dayText, month: monthText } = params;
  const day = parseInt(dayText, 10);
  const month = parseInt(monthText, 10) - 1;

  return (
    <FlexClient
      margin="0 auto"
      direction="column"
      height="100vh"
      maxWidth={800}
    >
      <Header day={day} month={month} />
      <FlexClient direction="column" padding={4} flex={1}>
        <UserDiaryPage month={month} day={day} />
      </FlexClient>
    </FlexClient>
  );
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;
