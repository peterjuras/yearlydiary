import { PropsWithChildren, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { UserContext } from "./UserContext";

const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    let newUserId: string | undefined;
    if (typeof window === "undefined" || userId) {
      // SSR or userId already set, aborting
      return;
    }

    // Parse and store userId from URL query
    const locallyStoredUserId = localStorage.getItem("userId");
    // Read userId from localStorage
    if (locallyStoredUserId) {
      newUserId = locallyStoredUserId;
    } else {
      // Generate new userId
      newUserId = uuid();
      // Store in localStorage
      localStorage.setItem("userId", newUserId as string);
    }

    // Update state
    setUserId(newUserId);
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
