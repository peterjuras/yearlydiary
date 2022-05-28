import { PropsWithChildren, useEffect, useState } from "react";
import { useTime, DAYS } from "react-time-sync";
import { DateContext } from "./DateContext";

const DateProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const currentDate = useTime({ interval: DAYS });

  const [selectedDate, setSelectedDate] = useState(currentDate);

  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

  return (
    <DateContext.Provider value={{ selectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

export default DateProvider;
