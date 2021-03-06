import { createContext } from "react";
import { User } from "../types/user";

interface UserContext {
  user?: User;
  error?: string;
  updateUser: (user: User) => void;
  clearUser: () => void;
}

export const UserContext = createContext<UserContext>({
  updateUser: () => {},
  clearUser: () => {},
});
