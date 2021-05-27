import React from "react";
import { useTimeout } from "../../hooks/useTimeout";
interface Props {
  id: string;
  timeout: number | string;
  onTimeoutEnd: () => void;
}
const TimedPreview: React.FC<Props> = ({
  timeout,
  id,
  onTimeoutEnd,
  children,
}) => {
  useTimeout(timeout, onTimeoutEnd);
  return <>{children}</>;
};

export default TimedPreview;
