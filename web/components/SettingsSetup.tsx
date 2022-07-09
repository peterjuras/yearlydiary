import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../lib/client/fetcher";
import { UserContext } from "./UserContext";

enum SetupMode {
  None,
  DisplayCode,
  EnterCode,
}

const SettingsSetup = () => {
  const { user } = useContext(UserContext);

  const [setupMode, setSetupMode] = useState(SetupMode.None);

  const getSetupCodeUrl =
    user?.userId && setupMode === SetupMode.DisplayCode
      ? `/api/users/${user.userId}/setup-code`
      : null;

  const setupCodeResponse = useSWR(getSetupCodeUrl, fetcher);

  let content;
  switch (setupMode) {
    case SetupMode.None: {
      function onSetupAnotherDeviceClick() {
        setSetupMode(SetupMode.DisplayCode);
      }

      function onEnterCodeClick() {
        setSetupMode(SetupMode.EnterCode);
      }

      content = (
        <>
          <Button
            disabled={!user?.userId}
            marginTop={5}
            marginBottom={5}
            width={200}
            onClick={onSetupAnotherDeviceClick}
          >
            Add another device
          </Button>
          <Button
            disabled={!user?.userId}
            marginBottom={5}
            width={200}
            onClick={onEnterCodeClick}
          >
            Enter code
          </Button>
        </>
      );
      break;
    }
    case SetupMode.DisplayCode: {
      const codeAvailable = !!setupCodeResponse.data?.code;
      content = (
        <Flex
          alignItems="center"
          marginTop={5}
          marginBottom={5}
          direction="column"
        >
          <Text marginBottom={5}>
            Visit yearlydiary.vercel.app on your other device and enter this
            code:
          </Text>
          {codeAvailable ? (
            <Text fontSize="3xl">{setupCodeResponse.data.code}</Text>
          ) : (
            <Spinner />
          )}
        </Flex>
      );
    }
    case SetupMode.EnterCode:
      // TODO: Continue here
      break;
    default:
      break;
  }

  return (
    <>
      <Text>Access your yearly diary on another device.</Text>
      {content}
    </>
  );
};

export default SettingsSetup;
