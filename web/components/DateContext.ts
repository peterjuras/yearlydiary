import { createContext } from "react";

interface DateContext {
  selectedDate: number;
}

export const DateContext = createContext<DateContext>({ selectedDate: 0 });
