import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { ChangeEvent, useContext, useState } from "react";
import { updateUser as updateUserApi } from "../lib-client/api";
import { UserContext } from "./UserContext";

const PublicPostsToggle: React.FC = () => {
  const { user, updateUser } = useContext(UserContext);
  const [isUpdating, setIsUpdating] = useState(false);

  async function onSwitchChanged(event: ChangeEvent<HTMLInputElement>) {
    const newPublicPosts = event.target.checked;

    setIsUpdating(true);

    try {
      await updateUserApi(user!.userId, newPublicPosts);
      updateUser({
        ...user!,
        publicPosts: newPublicPosts,
      });
    } catch (error) {
      // TODO: Display error
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <FormControl justifyContent="flex-end" display="flex" alignItems="center">
      <FormLabel htmlFor="public-posts" mb="0">
        Anonymously make answers visible to others
      </FormLabel>
      <Switch
        id="public-posts"
        disabled={!user || isUpdating}
        isChecked={user?.publicPosts}
        onChange={onSwitchChanged}
      />
    </FormControl>
  );
};

export default PublicPostsToggle;
