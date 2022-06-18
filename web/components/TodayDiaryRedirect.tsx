import { useRouter } from "next/router";
import { useEffect } from "react";
import { DAYS, useTime } from "react-time-sync";

const TodayDiaryRedirect: React.FC = () => {
  const router = useRouter();
  const currentTime = useTime({ interval: DAYS });

  useEffect(() => {
    const today = new Date(currentTime * 1000);
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    router.replace({
      pathname: "/diary/[month]/[day]",
      query: {
        month: todayMonth,
        day: todayDay,
      },
    });
  }, [router, currentTime]);

  return null;
};

export default TodayDiaryRedirect;
