import { createContext } from "react";

interface UserContext {
  userId?: string;
}

export const UserContext = createContext<UserContext>({});
