import { Suspense } from "react";
import { getPostsForDay } from "../lib/server/db";
import { questions } from "../lib/server/questions";
import AllPostsProvider from "./AllPostsProvider";
import LoadingSpinner from "./LoadingSpinner";
import QuestionDisplay from "./QuestionDisplay";

type AllPostsDiaryPageProps = {
  month: number;
  day: number;
};

const AllPostsDiaryPage: React.FC<AllPostsDiaryPageProps> = ({
  month,
  day,
}) => {
  //TODO Error boundary

  const question = questions[month][day];

  const allPostsPromise = getPostsForDay(day, month, 0);

  return (
    <>
      <QuestionDisplay question={question} />
      <Suspense fallback={<LoadingSpinner />}>
        <AllPostsProvider allPostsPromise={allPostsPromise} />
      </Suspense>
    </>
  );
};

export default AllPostsDiaryPage;
