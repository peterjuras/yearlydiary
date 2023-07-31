import Link from "next/link";
import { addDays } from "date-fns";
import FlexClient from "./client-wrappers/FlexClient";
import CalendarIconClient from "./client-wrappers/CalendarIconClient";
import TextClient from "./client-wrappers/TextClient";
import ChevronLeftIconClient from "./client-wrappers/ChevronLeftIconClient";
import ChevronRightIconClient from "./client-wrappers/ChevronRightIconClient";
import CloseIconClient from "./client-wrappers/CloseIconClient";
import SettingsIconClient from "./client-wrappers/SettingsIconClient";
import DividerClient from "./client-wrappers/DividerClient";

interface HeaderProps {
  routeSuffix?: string;
  closeRoute?: string;
  hideDayNavigation?: boolean;
  hideCalendar?: boolean;
  day?: number;
  month?: number;
}

const Header: React.FC<HeaderProps> = ({
  closeRoute,
  hideDayNavigation,
  hideCalendar,
  routeSuffix,
  day,
  month,
}) => {
  let displayedDate = "";

  let previousMonth = "";
  let previousDay = "";

  let nextMonth = "";
  let nextDay = "";

  if (!hideDayNavigation && day && typeof month !== "undefined") {
    const date = new Date();
    // Hardcode a leap year, to allow navigation to Feb 29
    date.setFullYear(2020);

    date.setDate(1);
    date.setMonth(month);
    date.setDate(day);

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
    <FlexClient
      position="relative"
      paddingTop={2}
      align="center"
      justify="center"
      direction="column"
    >
      <FlexClient alignItems="center">
        {!hideCalendar && (
          <Link href="/calendar">
            <CalendarIconClient
              boxSize={5}
              position="absolute"
              left={3}
              top={3}
            />
          </Link>
        )}
        {hideDayNavigation ? (
          <TextClient marginBottom={2}>yearlydiary</TextClient>
        ) : (
          <>
            <Link
              href={`/diary/${previousMonth}/${previousDay}${
                routeSuffix ?? ""
              }`}
            >
              <ChevronLeftIconClient boxSize={7} />
            </Link>
            <TextClient>{displayedDate}</TextClient>
            <Link href={`/diary/${nextMonth}/${nextDay}${routeSuffix ?? ""}`}>
              <ChevronRightIconClient boxSize={7} />
            </Link>
          </>
        )}
      </FlexClient>
      {closeRoute ? (
        <Link href={closeRoute}>
          <CloseIconClient boxSize={4} position="absolute" right={3} top={3} />
        </Link>
      ) : (
        <Link href="/settings">
          <SettingsIconClient
            boxSize={5}
            position="absolute"
            right={3}
            top={3}
          />
        </Link>
      )}
      <DividerClient />
    </FlexClient>
  );
};

export default Header;
