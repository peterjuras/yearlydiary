import { Button, Flex, Spinner, Text, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { uploadPost } from "../lib-client/api";
import { fetcher } from "../lib-client/fetcher";
import AnswerDisplay from "./AnswerDisplay";
import { UserContext } from "./UserContext";

const AnswerInput: React.FC = () => {
  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { userId } = useContext(UserContext);

  const router = useRouter();
  const { day, month, year } = router.query;

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
  };

  const handleSaveButtonClick = async () => {
    setIsUploading(true);

    try {
      await uploadPost(
        userId!,
        parseInt(day as string),
        parseInt(month as string),
        parseInt(year as string),
        answer
      );
      setSubmittedAnswer(answer);
    } catch (error) {
      // TODO: Handle error
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const getPostUrl = `/api/users/${userId}/posts/${year}/${month}/${day}`;

  const { data, error } = useSWR(
    userId && router.isReady ? getPostUrl : null,
    fetcher
  );

  const isLoadingStoredAnswer = !data && !error;

  useEffect(() => {
    if (data) {
      setSubmittedAnswer(data.answer);
    }
  }, [data]);

  return (
    <Flex marginBottom={4} direction="column">
      {isLoadingStoredAnswer && <Spinner alignSelf="center" />}
      {!isLoadingStoredAnswer && !submittedAnswer && (
        <>
          <Textarea
            disabled={isUploading}
            marginBottom={4}
            value={answer}
            onChange={handleTextareaChange}
            placeholder="Write your text here!"
          />
          <Button
            isLoading={!userId || isUploading}
            onClick={handleSaveButtonClick}
          >
            Save
          </Button>
        </>
      )}
      {!!submittedAnswer && <AnswerDisplay answer={submittedAnswer} />}
    </Flex>
  );
};

export default AnswerInput;
