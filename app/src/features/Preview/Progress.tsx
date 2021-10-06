import React, { useEffect, useRef, useState } from "react";
import { LinearProgress } from "@mui/material";
import moment from "moment";
interface Props {
  duration: number;
  state: "empty" | "full" | "running";
}

const Progress: React.FC<Props> = ({ duration, state }) => {
  const [progress, setProgress] = useState(0);
  const interval = useRef<NodeJS.Timeout>();
  // 101 for smoothness
  const completed = progress >= 101;
  useEffect(() => {
    if (state === "full") {
      setProgress(100);
      clearInterval(interval.current as any);
    } else if (state === "empty") {
      setProgress(0);
      clearInterval(interval.current as any);
    }
  }, [state]);
  useEffect(() => {
    clearInterval(interval?.current as any);
    if (state === "running") {
      setProgress(0);
      const startTime = moment();
      interval.current = setInterval(
        () =>
          setProgress(
            (moment().diff(startTime) /
              (parseFloat(duration.toString()) * 1000)) *
              100
          ),
        1000
      );
    }
    return () => clearInterval(interval?.current as any);
  }, [duration, state, completed]);
  return (
    <LinearProgress
      sx={{
        zIndex: 99,
        height: 2,
        background: "rgba(100, 100, 100, 0.7)",
        borderRadius: 1,
        "& div": {
          background: "white",
        },
      }}
      variant="determinate"
      value={state === "full" ? 100 : state === "empty" ? 0 : progress}
    />
  );
};

export default Progress;
