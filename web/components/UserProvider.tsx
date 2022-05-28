import { useRouter } from "next/router";
import { PropsWithChildren, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { UserContext } from "./UserContext";

const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [userId, setUserId] = useState<string | undefined>();
  const router = useRouter();

  useEffect(() => {
    let newUserId: string | undefined;
    if (typeof window === "undefined" || userId || !router.isReady) {
      // SSR, router not ready or userId already set, aborting
      return;
    }

    // Parse and store userId from URL query
    const locallyStoredUserId = localStorage.getItem("userId");
    if (router.query.userId) {
      newUserId = router.query.userId as string;
      // Read userId from localStorage
    } else if (locallyStoredUserId) {
      newUserId = locallyStoredUserId;
    } else {
      // Generate new userId
      newUserId = uuid();
    }

    // Update URL Query parameter
    router.replace({
      query: { ...router.query, userId: newUserId },
    });

    // Store in localStorage
    localStorage.setItem("userId", newUserId as string);

    // Update state
    setUserId(newUserId);
  }, [router, userId]);

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
