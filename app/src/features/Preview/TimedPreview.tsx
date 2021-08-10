import React from "react";
import { useTimeout } from "../../hooks/useTimeout";

const TimedPreview: React.FC<{
  id: string;
  timeout: number | string;
  onTimeoutEnd: (() => void) | null;
}> = ({ timeout, id, onTimeoutEnd, children }) => {
  useTimeout(timeout, onTimeoutEnd);
  return <>{children}</>;
};

export default TimedPreview;
