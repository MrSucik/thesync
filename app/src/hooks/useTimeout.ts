import { useRef, useEffect } from "react";

export const useTimeout = (
  timeSeconds: number | string,
  onTimeoutEnded: (() => void) | null
) => {
  const timeout = useRef<number | undefined>();
  useEffect(() => {
    if (onTimeoutEnded) {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        onTimeoutEnded();
      }, parseFloat(timeSeconds as string) * 1000) as unknown as number;
    }
    return () => clearTimeout(timeout.current);
  }, [onTimeoutEnded, timeSeconds]);
};
