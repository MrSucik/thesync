import moment = require("moment");

export const getMonday = (date: moment.Moment) =>
  moment(date).startOf("isoWeek");

export const getNearestWeekday = () => {
  let desiredDay = moment().add(8, "hours");
  if (desiredDay.weekday() === 6) {
    desiredDay = desiredDay.add(2, "days");
  } else if (desiredDay.weekday() === 7) {
    desiredDay = desiredDay.add(1, "day");
  }
  return desiredDay;
};
