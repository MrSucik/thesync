import * as functions from "firebase-functions";
import { firestore } from "./fire";
import moment = require("moment");

export const handleError = (
  error: any,
  endpoint: string,
  response?: functions.Response<any>
) => {
  firestore.collection("logs").add({
    ...error,
    endpoint,
    created: moment().format(),
  });
  console.warn(error);
  response && sendErrorToClient(response, error);
};

const sendErrorToClient = (response: functions.Response<any>, error: any) =>
  response
    .status(500)
    .send({ error: error, a: error.message, b: JSON.stringify(error) });
