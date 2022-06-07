import { PropsWithChildren, useEffect, useState } from "react";
import { createUser } from "../lib-client/api";
import { User } from "../types/user";
import { UserContext } from "./UserContext";

const UserProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    console.log("Running useEffect - user is: ", user);
    async function initializeUser() {
      let newUser: User | undefined;

      if (typeof window === "undefined" || user) {
        // SSR or user already set, aborting
        return;
      }

      // Parse and store userId from URL query
      const locallyStoredUser = localStorage.getItem("user");
      // Read userId from localStorage
      if (locallyStoredUser) {
        newUser = JSON.parse(locallyStoredUser);
      } else {
        // Create a new user
        try {
          console.log("Creating user");
          newUser = await createUser();

          // Store in localStorage
          localStorage.setItem("user", JSON.stringify(newUser));
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
  }, [user]);

  function updateUser(user: User) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return (
    <UserContext.Provider
      value={{
        user,
        error,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
