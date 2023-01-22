"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function ChakraProviderClient({
  children,
}: {
  children: ReactNode;
}) {
  return <ChakraProvider resetCSS>{children}</ChakraProvider>;
}
