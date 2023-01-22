"use client";

import { Flex, Spinner } from "@chakra-ui/react";

const LoadingSpinner: React.FC = () => {
  return (
    <Flex flex={1} alignItems="center" justifyContent="center">
      <Spinner />
    </Flex>
  );
};

export default LoadingSpinner;
