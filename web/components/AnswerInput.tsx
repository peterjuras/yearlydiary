import { Button, Flex, Text, Textarea } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

const AnswerInput: React.FC = () => {
  const [answer, setAnswer] = useState("");
  const [submittedAnswer, setSubmittedAnswer] = useState("");

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(event.target.value);
  };

  const handleSaveButtonClick = () => {
    setSubmittedAnswer(answer);
  };

  return (
    <Flex marginBottom={4} direction="column">
      {!submittedAnswer && (
        <>
          <Textarea
            marginBottom={4}
            value={answer}
            onChange={handleTextareaChange}
            placeholder="Write your text here!"
          />
          <Button onClick={handleSaveButtonClick}>Save</Button>
        </>
      )}
      {!!submittedAnswer && (
        <Flex
          paddingTop={10}
          paddingBottom={10}
          paddingLeft={5}
          paddingRight={5}
          marginBottom={4}
          boxShadow="outline"
          rounded="md"
        >
          <Text>{submittedAnswer}</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default AnswerInput;
