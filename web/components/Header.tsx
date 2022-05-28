import { Divider, Flex, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { DateContext } from "./DateContext";

const Header: React.FC = () => {
  const { selectedDate } = useContext(DateContext);
  const [displayedDate, setDisplayedDate] = useState("");

  useEffect(() => {
    console.log(selectedDate);
    setDisplayedDate(
      new Intl.DateTimeFormat().format(new Date(selectedDate * 1000))
    );
  }, [selectedDate]);

  return (
    <Flex paddingTop={2} align="center" justify="center" direction="column">
      <Text marginBottom={2}>{displayedDate}</Text>
      <Divider />
    </Flex>
  );
};

export default Header;
