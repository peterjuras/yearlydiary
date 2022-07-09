import {
  Button,
  Divider,
  Flex,
  Link,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { useContext, useState } from "react";
import { deleteUserData } from "../lib/client/api";
import { UserContext } from "./UserContext";

const Settings: React.FC = () => {
  const { user, clearUser } = useContext(UserContext);

  const [isBusy, setIsBusy] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const downloadDataUrl = `/api/users/${user?.userId}/download-data`;
  const buttonsDisabled = !user?.userId || isBusy;

  async function onDeleteDataClick() {
    try {
      setIsBusy(true);
      await deleteUserData(user!.userId);
      clearUser();
      setShowDeleteConfirmation(true);
    } catch (error) {
      // TODO: Handle error
      console.error(error);
    } finally {
      setIsBusy(false);
    }
  }

  const downloadButton = (
    <Button
      disabled={buttonsDisabled}
      marginTop={5}
      marginBottom={5}
      width={200}
    >
      Download all data
    </Button>
  );
  let downloadButtonContainer;
  if (buttonsDisabled) {
    downloadButtonContainer = downloadButton;
  } else {
    downloadButtonContainer = (
      <LinkBox>
        <LinkOverlay href={downloadDataUrl}>{downloadButton}</LinkOverlay>
      </LinkBox>
    );
  }

  return (
    <Flex justify="center" align="center" direction="column">
      <Text alignSelf="flex-start" fontSize="sm">
        Manage your account
      </Text>
      <Divider marginTop={2} marginBottom={2} />
      {downloadButtonContainer}
      <Button
        disabled={buttonsDisabled}
        colorScheme="red"
        width={200}
        onClick={onDeleteDataClick}
      >
        Delete all data
      </Button>
      {showDeleteConfirmation && (
        <Text marginTop={4}>Your data has been deleted.</Text>
      )}
      <Text marginTop={7} alignSelf="flex-start" fontSize="sm">
        About
      </Text>
      <Divider marginTop={2} marginBottom={2} />
      <Text>
        Made with &#10084; by{" "}
        <Link color="teal" href="https://www.peterjuras.com" isExternal>
          Peter Juras
        </Link>
        .
      </Text>
      <LinkBox>
        <LinkOverlay
          href="https://github.com/peterjuras/yearlydiary"
          isExternal
        >
          <Button marginTop={3} leftIcon={<FaGithub />}>
            Fork me on GitHub
          </Button>
        </LinkOverlay>
      </LinkBox>
    </Flex>
  );
};

export default Settings;
