import { Divider, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { addDays } from "date-fns";

interface HeaderProps {
  routeSuffix?: string;
  closeRoute?: string;
}

const Header: React.FC<HeaderProps> = ({ closeRoute, routeSuffix }) => {
  const router = useRouter();
  const { day, month } = router.query;

  let displayedDate = "";

  let previousMonth = "";
  let previousDay = "";

  let nextMonth = "";
  let nextDay = "";

  if (router.isReady && day && month) {
    const date = new Date();
    // Hardcode a leap year, to allow navigation to Feb 29
    date.setFullYear(2020);

    date.setMonth(parseInt(month as string) - 1);
    date.setDate(parseInt(day as string));

    displayedDate = new Intl.DateTimeFormat(undefined, {
      month: "numeric",
      day: "numeric",
    }).format(date);

    const previousDate = addDays(date, -1);
    const nextDate = addDays(date, 1);

    previousMonth = (previousDate.getMonth() + 1).toString();
    previousDay = previousDate.getDate().toString();

    nextMonth = (nextDate.getMonth() + 1).toString();
    nextDay = nextDate.getDate().toString();
  }

  return (
    <Flex paddingTop={2} align="center" justify="center" direction="column">
      <Flex alignItems="center">
        <Link
          href={
            router.isReady
              ? `/diary/${previousMonth}/${previousDay}${routeSuffix ?? ""}`
              : "/"
          }
        >
          <ChevronLeftIcon boxSize={7} />
        </Link>
        <Text>{displayedDate}</Text>
        <Link
          href={
            router.isReady
              ? `/diary/${nextMonth}/${nextDay}${routeSuffix ?? ""}`
              : "/"
          }
        >
          <ChevronRightIcon boxSize={7} />
        </Link>
      </Flex>
      {!!closeRoute && (
        <Link href={closeRoute}>
          <CloseIcon boxSize={4} position="absolute" right={3} top={3} />
        </Link>
      )}
      <Divider />
    </Flex>
  );
};

export default Header;
