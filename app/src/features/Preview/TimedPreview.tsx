import React from "react";
import { useTimeout } from "hooks/useTimeout";

const TimedPreview: React.FC<{
  timeout: number | string;
  onTimeoutEnd: (() => void) | null;
}> = ({ timeout, onTimeoutEnd, children }) => {
  useTimeout(timeout, onTimeoutEnd);
  return <>{children}</>;
};

export default TimedPreview;
