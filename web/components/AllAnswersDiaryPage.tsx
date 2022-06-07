import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../lib/client/fetcher";
import { Answer } from "../types/answer";
import AllAnswers from "./AllAnswers";
import LoadingSpinner from "./LoadingSpinner";
import QuestionDisplay from "./QuestionDisplay";

const AllAnswersDiaryPage: React.FC = () => {
  const router = useRouter();

  const { day, month } = router.query;

  const getAllPostsUrl = `/api/posts/${parseInt(month as string) - 1}/${day}`;

  const { data, error } = useSWR<{ answers: Answer[]; question: string }>(
    router.isReady ? getAllPostsUrl : null,
    fetcher
  );

  const isLoading = !data && !error;

  if (isLoading || !data) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <div>TOOD: Explain error</div>;
  }

  return (
    <>
      <QuestionDisplay question={data.question} />
      <AllAnswers answers={data.answers} />
    </>
  );
};

export default AllAnswersDiaryPage;
