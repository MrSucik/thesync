import moment, { Moment } from "moment";

export const usePythonStatus = (lastUpdateRequest: Moment) => {
  const secondsUntilOffline = 20;
  return moment.duration(moment().diff(lastUpdateRequest)).asSeconds() >
    secondsUntilOffline || !lastUpdateRequest
    ? "offline"
    : "online";
};
