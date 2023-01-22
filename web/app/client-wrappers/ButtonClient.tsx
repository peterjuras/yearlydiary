"use client";

import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function ButtonClient({
  children,
  ...props
}: ButtonProps & {
  children: ReactNode;
}) {
  return <Button {...props}>{children}</Button>;
}
