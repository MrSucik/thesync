import moment from "moment";
import { useRef, useEffect } from "react";

export const useTimeout = (
  timeSeconds: number | string,
  onTimeoutEnded: (() => void) | null
) => {
  const timeout = useRef<any>(0);
  useEffect(() => {
    if (onTimeoutEnded) {
      console.log("starting timer: " + moment().valueOf());
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        onTimeoutEnded();
      }, parseFloat(timeSeconds as string) * 1000);
    }
    return () => clearTimeout(timeout.current);
  }, [onTimeoutEnded, timeSeconds]);
};
