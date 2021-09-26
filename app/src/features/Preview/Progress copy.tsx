import React, { useEffect, useRef, useState } from "react";
import { styled } from "@material-ui/core/styles";
import { LinearProgress } from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import moment from "moment";

const PREFIX = "Progress";

const classes = {
  progress: `${PREFIX}-progress`,
};

// const Root = styled(
//   'inearProgress\n      className={classes.progress}\n      variant="determinate"\n      value={\n        state === "full"\n          ? 100\n          : state === "empty"\n          ? 0\n          : progress '
// )(() => ({
//   [`& .${classes.progress}`]: {
//     zIndex: 99,
//     height: 2,
//     background: "rgba(100, 100, 100, 0.7)",
//     "& div": {
//       background: "white",
//     },
//   },
// }));

interface Props {
  duration: number;
  state: "empty" | "full" | "running";
}

const Progress: React.FC<Props> = ({ duration, state }) => {
  const [progress, setProgress] = useState(0);
  const interval = useRef<NodeJS.Timeout>();

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
      const durationSeconds = parseFloat(duration.toString());
      setProgress(100 / durationSeconds);
      const startTime = moment();
      interval.current = setInterval(
        () =>
          setProgress(
            (moment().diff(startTime) / (durationSeconds * 1000)) * 100 +
              100 / durationSeconds
          ),
        1000
      );
      return () => clearInterval(interval?.current as any);
    }
  }, [duration, state]);
  return (
    <LinearProgress
      className={classes.progress}
      variant="determinate"
      value={
        state === "full"
          ? 100
          : state === "empty"
          ? 0
          : progress > 100
          ? 100
          : progress
      }
    />
  );
};

export default Progress;
