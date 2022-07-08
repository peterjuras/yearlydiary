import { Button, Flex, Text } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { deleteUserData } from "../lib/client/api";
import { UserContext } from "./UserContext";

const Settings: React.FC = () => {
  const { user, clearUser } = useContext(UserContext);

  const [isBusy, setIsBusy] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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

  return (
    <Flex justify="center" direction="column">
      <Button disabled={!user?.userId || isBusy} onClick={onDeleteDataClick}>
        Delete all data
      </Button>
      {showDeleteConfirmation && (
        <Text marginTop={4}>Your data has been deleted.</Text>
      )}
    </Flex>
  );
};

export default Settings;
