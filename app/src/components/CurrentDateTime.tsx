import moment from "moment";
import { useEffect, useState } from "react";

const CurrentDateTime = () => {
  const [time, setTime] = useState(moment());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <>{time.format("(dd) DD. MM. HH:mm:ss")}</>;
};

export default CurrentDateTime;
