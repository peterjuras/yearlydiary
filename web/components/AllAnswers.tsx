import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../lib-client/fetcher";
import AnswerDisplay from "./AnswerDisplay";

const AllAnswers: React.FC = () => {
  const router = useRouter();

  const { day, month, year } = router.query;

  const getAllPostsUrl = `/api/posts/${year}/${month}/${day}`;

  const { data, error } = useSWR<{ answer: string }[]>(
    router.isReady ? getAllPostsUrl : null,
    fetcher
  );

  const isLoading = !router.isReady || (!data && !error);

  // TODO: Handle error

  if (isLoading || !data) {
    return <Spinner alignSelf="center" />;
  }

  return (
    <Flex direction="column">
      {data.map(({ answer }, index) => (
        <AnswerDisplay key={index} answer={answer} />
      ))}
    </Flex>
  );
};

export default AllAnswers;
