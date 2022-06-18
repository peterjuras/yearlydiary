import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useState } from "react";
import { DAYS, useTime } from "react-time-sync";
import { uploadPost } from "../lib/client/api";
import { Answer } from "../types/answer";
import AnswerDisplay from "./AnswerDisplay";
import PublicPostsToggle from "./PublicPostsToggle";
import { UserContext } from "./UserContext";

interface AnswerInputProps {
  storedAnswer: Answer | undefined;
  currentYear: number;
}

const AnswerInput: React.FC<AnswerInputProps> = ({
  storedAnswer,
  currentYear,
}) => {
  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useContext(UserContext);
  const currentTime = useTime({ interval: DAYS });
  const currentDate = new Date(currentTime * 1000);

  const router = useRouter();
  const { day, month } = router.query;
  const parsedDay = parseInt(day as string);
  const parsedMonth = parseInt(month as string) - 1;

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
  };

  const handleSaveButtonClick = async () => {
    setIsUploading(true);

    try {
      await uploadPost(
        user!.userId,
        parsedDay,
        parsedMonth,
        currentYear,
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

  const todaysAnswer = submittedAnswer || (storedAnswer && storedAnswer.answer);

  const canSubmitAnswer =
    currentYear === currentDate.getFullYear() &&
    parsedMonth === currentDate.getMonth() &&
    parsedDay === currentDate.getDate();
  let nextAnswerDateFormatted = "";
  if (!canSubmitAnswer) {
    const nextAnswerDate = new Date();

    // Hardcode year to leap year to allow display of Feb 29
    nextAnswerDate.setFullYear(2020);

    nextAnswerDate.setMonth(parsedMonth);
    nextAnswerDate.setDate(parsedDay);

    nextAnswerDateFormatted = new Intl.DateTimeFormat(undefined, {
      month: "numeric",
      day: "numeric",
    }).format(nextAnswerDate);
  }

  return (
    <Flex marginBottom={4} direction="column">
      {!todaysAnswer && canSubmitAnswer && (
        <>
          <Textarea
            disabled={isUploading}
            marginBottom={4}
            value={answer}
            onChange={handleTextareaChange}
            placeholder="Write your text here!"
          />
          <PublicPostsToggle />
          <Button
            alignSelf="center"
            marginTop={4}
            width={200}
            isLoading={!user || isUploading}
            onClick={handleSaveButtonClick}
          >
            Save
          </Button>
        </>
      )}
      {!todaysAnswer && !canSubmitAnswer && (
        <Text>
          Come back on {nextAnswerDateFormatted} to submit your answer!
        </Text>
      )}
      {!!todaysAnswer && (
        <>
          <AnswerDisplay answer={todaysAnswer} year={currentYear} />
          <PublicPostsToggle />
        </>
      )}
    </Flex>
  );
};

export default AnswerInput;
