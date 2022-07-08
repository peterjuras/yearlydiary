import { PropsWithChildren, useEffect, useState } from "react";
import { createUser } from "../lib/client/api";
import { User } from "../types/user";
import { UserContext } from "./UserContext";

interface UserProviderProps extends PropsWithChildren {
  disableAutomaticUserCreation?: boolean;
}

const LOCALSTORAGE_USER_KEY = "user";

const UserProvider: React.FC<UserProviderProps> = ({
  children,
  disableAutomaticUserCreation,
}) => {
  const [user, setUser] = useState<User | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    async function initializeUser() {
      let newUser: User | undefined;

      if (typeof window === "undefined" || user) {
        // SSR or user already set, aborting
        return;
      }

      // Parse and store userId from URL query
      const locallyStoredUser = localStorage.getItem(LOCALSTORAGE_USER_KEY);
      // Read userId from localStorage
      if (locallyStoredUser) {
        newUser = JSON.parse(locallyStoredUser);
      } else if (!disableAutomaticUserCreation) {
        // Create a new user
        try {
          newUser = await createUser();

          // Store in localStorage
          localStorage.setItem(LOCALSTORAGE_USER_KEY, JSON.stringify(newUser));
        } catch (error: unknown) {
          setError(
            "An error occurred. Please refresh the page or try again later."
          );
        }
      }

      // Update state
      setUser(newUser);
    }
    initializeUser();
  }, [user, disableAutomaticUserCreation]);

  function updateUser(user: User) {
    setUser(user);
    localStorage.setItem(LOCALSTORAGE_USER_KEY, JSON.stringify(user));
  }

  function clearUser() {
    setUser(undefined);
    localStorage.removeItem(LOCALSTORAGE_USER_KEY);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        error,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
