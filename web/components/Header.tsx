import { Divider, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Header: React.FC = () => {
  const router = useRouter();
  const { day, month, year } = router.query;

  let displayedDate = "";
  if (router.isReady && day && month && year) {
    const date = new Date();
    date.setFullYear(parseInt(year as string));
    date.setMonth(parseInt(month as string));
    date.setDate(parseInt(day as string));
    displayedDate = new Intl.DateTimeFormat().format(date);
  }

  return (
    <Flex paddingTop={2} align="center" justify="center" direction="column">
      <Text marginBottom={2}>{displayedDate}</Text>
      <Divider />
    </Flex>
  );
};

export default Header;
