"use client";

import { Text, TextProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function TextClient({
  children,
  ...props
}: TextProps & {
  children: ReactNode;
}) {
  return <Text {...props}>{children}</Text>;
}
