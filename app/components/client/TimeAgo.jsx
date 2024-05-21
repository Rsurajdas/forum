import { useEffect, useState } from "react";
import { timeAgo } from "../../utils/timeAgo";

export default function TimeAgo({ date }) {
  const [timePassed, setTimePassed] = useState(timeAgo(date));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimePassed(timeAgo(date));
    }, 60000);

    return () => clearInterval(intervalId); // 
  }, [date]);

  return <span>{timePassed}</span>;
}