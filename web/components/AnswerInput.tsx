import { Button, Flex, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, useContext, useState } from "react";
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

  const router = useRouter();
  const { day, month } = router.query;

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
  };

  const handleSaveButtonClick = async () => {
    setIsUploading(true);

    try {
      await uploadPost(
        user!.userId,
        parseInt(day as string),
        parseInt(month as string) - 1,
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

  return (
    <Flex marginBottom={4} direction="column">
      {!todaysAnswer && (
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
