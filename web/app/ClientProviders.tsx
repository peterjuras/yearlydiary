"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import UserProvider from "../components/UserProvider";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider resetCSS>
      <UserProvider>{children}</UserProvider>
    </ChakraProvider>
  );
}
