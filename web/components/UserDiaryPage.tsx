import { useRouter } from "next/router";
import { useContext } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/client/fetcher";
import { Answer } from "../types/answer";
import AnswerInput from "./AnswerInput";
import LoadingSpinner from "./LoadingSpinner";
import PreviousAnswers from "./PreviousAnswers";
import QuestionDisplay from "./QuestionDisplay";
import { UserContext } from "./UserContext";

const UserDiaryPage: React.FC = () => {
  const { user } = useContext(UserContext);

  const router = useRouter();
  const { day, month } = router.query;
  const getPostUrl = `/api/users/${user?.userId}/posts/${
    parseInt(month as string) - 1
  }/${day}`;

  const { data, error } = useSWR<{ answers: Answer[]; question: string }>(
    user?.userId && router.isReady ? getPostUrl : null,
    fetcher
  );

  if (!data && !error) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <div>TODO: Explain error</div>;
  }

  const currentYear = new Date().getFullYear();
  const storedAnswer = data.answers.find(
    (answer) => answer.year === currentYear
  );
  const previousAnswers = data.answers.filter(
    (answer) => answer.year !== currentYear
  );

  return (
    <>
      <QuestionDisplay question={data.question} />
      <AnswerInput storedAnswer={storedAnswer} currentYear={currentYear} />
      <PreviousAnswers answers={previousAnswers} />
    </>
  );
};

export default UserDiaryPage;
