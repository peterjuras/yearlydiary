import { CheckCircleIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, Spinner, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useCountdown } from "react-time-sync";
import useSWR from "swr";
import formatDate from "date-fns/format";
import { fetcher } from "../lib/client/fetcher";
import SettingsSetupEnterCode from "./SettingsSetupEnterCode";
import { UserContext } from "./UserContext";

enum SetupMode {
  None,
  DisplayCode,
  EnterCode,
  EnterCodeSuccess,
}

const SettingsSetup = () => {
  const { user } = useContext(UserContext);

  const [setupMode, setSetupMode] = useState(SetupMode.None);

  const getSetupCodeUrl =
    user?.userId && setupMode === SetupMode.DisplayCode
      ? `/api/users/${user.userId}/setup-code`
      : null;

  const setupCodeResponse = useSWR<{ code: string; expiryDate: string }>(
    getSetupCodeUrl,
    fetcher
  );

  let expiryDateUntil = 0;
  if (setupCodeResponse.data?.expiryDate) {
    expiryDateUntil = new Date(setupCodeResponse.data.expiryDate).getTime();
  }

  const setupCodeCountdown = useCountdown({
    until: expiryDateUntil,
  });

  useEffect(() => {
    if (!setupCodeResponse.data?.expiryDate || setupCodeCountdown > 0) {
      return;
    }

    setupCodeResponse.mutate(setupCodeResponse.data, {
      revalidate: true,
    });
  }, [setupCodeCountdown, setupCodeResponse]);

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

      let timeLeft = formatDate(setupCodeCountdown * 1000, "m:ss");

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
            <>
              <Text fontSize="3xl">{setupCodeResponse.data?.code}</Text>
              <Text marginTop={5}>
                This code expires in {timeLeft} minutes.
              </Text>
            </>
          ) : (
            <Spinner />
          )}
        </Flex>
      );
      break;
    }
    case SetupMode.EnterCode: {
      function onEnterCodeSuccess() {
        setSetupMode(SetupMode.EnterCodeSuccess);
      }

      content = <SettingsSetupEnterCode onSuccess={onEnterCodeSuccess} />;
      break;
    }
    case SetupMode.EnterCodeSuccess:
      content = (
        <>
          <CheckCircleIcon
            marginTop={10}
            marginBottom={5}
            color="green"
            boxSize={20}
          />
          <Text marginBottom={10}>Your devices are now connected!</Text>
        </>
      );
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
