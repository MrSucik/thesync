import { useRef, useEffect } from "react";

export const useTimeout = (
  timeSeconds: number | string,
  onTimeoutEnded: () => void
) => {
  const timeout = useRef<any>(0);
  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      onTimeoutEnded();
    }, parseFloat(timeSeconds as string) * 1000);
    return () => clearTimeout(timeout.current);
  }, [onTimeoutEnded, timeSeconds]);
};
