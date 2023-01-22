"use client";

import { Flex, FlexProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function FlexClient({
  children,
  ...props
}: FlexProps & {
  children: ReactNode;
}) {
  return <Flex {...props}>{children}</Flex>;
}
