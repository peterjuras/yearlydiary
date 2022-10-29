import { Button, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { DAYS, useTime } from "react-time-sync";

interface CalendarMonthProps {
  month: number;
  numberOfDays: number;
  monthLabel: string;
  postDates?: number[];
}

const CalendarMonth: React.FC<CalendarMonthProps> = ({
  month,
  numberOfDays,
  monthLabel,
  postDates,
}) => {
  const postDatesSet = new Set(postDates);

  const currentTime = useTime({ interval: DAYS });
  const todayDate = new Date(currentTime * 1000);
  const todayDay = todayDate.getDate();
  const todayMonth = todayDate.getMonth();

  const dayViews = [...Array(numberOfDays)].map((_, index) => {
    const currentDay = index + 1;
    const isToday = month === todayMonth && currentDay === todayDay;

    function onDayButtonClick() {
      redirect(`/diary/${month + 1}/${currentDay}`);
    }

    let colorScheme;
    if (isToday) {
      colorScheme = "blue";
    } else if (postDatesSet.has(currentDay)) {
      colorScheme = "teal";
    }

    return (
      <WrapItem key={`${month}${currentDay}`}>
        <Button
          onClick={onDayButtonClick}
          height={20}
          width={20}
          colorScheme={colorScheme}
        >
          {currentDay}
        </Button>
      </WrapItem>
    );
  });

  return (
    <Flex direction="column" marginBottom={5}>
      <Text alignSelf="center" marginBottom={2}>
        {monthLabel}
      </Text>
      <Wrap justify="center">{dayViews}</Wrap>
    </Flex>
  );
};

export default CalendarMonth;
