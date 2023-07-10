import { Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { ChangeEventHandler, useContext, useRef, useState } from "react";
import { getUserInfoFromSetupCode } from "../lib/client/api";

interface SettingsSetupEnterCodeProps {
  onSuccess: () => void;
}

const SettingsSetupEnterCode: React.FC<SettingsSetupEnterCodeProps> = ({
  onSuccess,
}) => {
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputValue4, setInputValue4] = useState("");
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRef4 = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);

  const currentCode = `${inputValue1}${inputValue2}${inputValue3}${inputValue4}`;

  const onCodeInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setHasError(false);

    const inputRefs = [inputRef1, inputRef2, inputRef3, inputRef4];
    const inputValueSetters = [
      setInputValue1,
      setInputValue2,
      setInputValue3,
      setInputValue4,
    ];

    const index = inputRefs.findIndex((ref) => ref.current === event.target);
    if (index === -1) {
      return;
    }

    // Ensure field only contains a single character
    const newFieldValue = event.target.value.substring(
      event.target.value.length - 1,
      event.target.value.length,
    );
    inputValueSetters[index](newFieldValue);

    if (newFieldValue.length === 0) {
      // Set focus on the previous field
      if (index > 0) {
        inputRefs[index - 1].current?.focus();
      }

      return;
    }

    if (index === inputRefs.length - 1) {
      event.target.blur();
      submitButtonRef.current?.focus();
    } else {
      inputRefs[index + 1].current?.focus();
    }
  };

  async function onSubmitClick() {
    try {
      setIsSubmitting(true);

      await getUserInfoFromSetupCode(currentCode);
      onSuccess();
    } catch (error) {
      console.error(error);
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Flex alignItems="center" marginTop={5} marginBottom={5} direction="column">
      <Text>Enter the code from your other device:</Text>
      <Flex marginTop={2}>
        <Input
          ref={inputRef1}
          value={inputValue1}
          isInvalid={hasError}
          disabled={isSubmitting}
          onChange={onCodeInputChange}
          name="code-input-1"
          width={20}
        ></Input>
        <Input
          ref={inputRef2}
          value={inputValue2}
          isInvalid={hasError}
          disabled={isSubmitting}
          onChange={onCodeInputChange}
          name="code-input-2"
          width={20}
        ></Input>
        <Input
          ref={inputRef3}
          value={inputValue3}
          isInvalid={hasError}
          disabled={isSubmitting}
          onChange={onCodeInputChange}
          name="code-input-3"
          width={20}
        ></Input>
        <Input
          ref={inputRef4}
          value={inputValue4}
          isInvalid={hasError}
          disabled={isSubmitting}
          onChange={onCodeInputChange}
          name="code-input-4"
          width={20}
        ></Input>
      </Flex>
      <Button
        ref={submitButtonRef}
        disabled={currentCode.length !== 4 || isSubmitting}
        marginTop={5}
        width={200}
        onClick={onSubmitClick}
      >
        {isSubmitting ? <Spinner /> : "Submit"}
      </Button>
    </Flex>
  );
};

export default SettingsSetupEnterCode;
