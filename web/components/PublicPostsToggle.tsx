import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { updateUser as updateUserApi } from "../lib/client/api";

type PublicPostsToggleProps = {
  disabled?: boolean;
  publicPosts: boolean;
};

const PublicPostsToggle: React.FC<PublicPostsToggleProps> = ({
  disabled,
  publicPosts,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  async function onSwitchChanged(event: ChangeEvent<HTMLInputElement>) {
    const newPublicPosts = event.target.checked;

    setIsUpdating(true);

    try {
      await updateUserApi(newPublicPosts);
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
        disabled={isUpdating || disabled}
        isChecked={publicPosts}
        onChange={onSwitchChanged}
      />
    </FormControl>
  );
};

export default PublicPostsToggle;
