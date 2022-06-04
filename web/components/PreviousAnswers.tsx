import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const PreviousAnswers = () => {
  const router = useRouter();
  const { day, month, year } = router.query;

  return (
    <Flex marginTop={5} direction="column">
      <Divider />
      <Text marginTop={5}>You don&apos;t have a previous answers yet</Text>
      <Text marginTop={5}>Check out what others have answered today!</Text>
      <Link href={`/diary/${year}/${month}/${day}/all`}>
        <Button marginTop={5}>See all answers</Button>
      </Link>
    </Flex>
  );
};

export default PreviousAnswers;
