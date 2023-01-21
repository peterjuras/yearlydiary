import { PropsWithChildren, useEffect, useState } from "react";
import { createUser } from "../lib/client/api";
import { User } from "../types/user";
import { UserContext } from "./UserContext";

interface UserProviderProps extends PropsWithChildren {
  disableAutomaticUserCreation?: boolean;
}

const LOCALSTORAGE_USER_KEY = "user";

function setCookie(userId: string | undefined) {
  document.cookie = `userId=${userId}; Max-Age=1735707600`;
}

function clearCookie() {
  document.cookie = "userId=; Expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

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
        // Update cookie
        setCookie(newUser?.userId);
      } else if (!disableAutomaticUserCreation) {
        // Create a new user
        try {
          newUser = await createUser();

          // Store in localStorage
          localStorage.setItem(LOCALSTORAGE_USER_KEY, JSON.stringify(newUser));
          // Store in cookie
          setCookie(newUser.userId);
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
    setCookie(user.userId);
  }

  function clearUser() {
    setUser(undefined);
    localStorage.removeItem(LOCALSTORAGE_USER_KEY);
    clearCookie();
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
