"use client";

import { Heading, HeadingProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function HeadingClient({
  children,
  ...props
}: HeadingProps & {
  children: ReactNode;
}) {
  return <Heading {...props}>{children}</Heading>;
}
