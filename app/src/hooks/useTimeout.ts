import { useRef, useEffect } from "react";

export const useTimeout = (timeSeconds: number, onTimeoutEnded: () => void) => {
  const timeout = useRef<any>(0);
  useEffect(() => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      onTimeoutEnded();
    }, timeSeconds * 1000);
    return () => clearTimeout(timeout.current);
  }, [onTimeoutEnded, timeSeconds]);
};
