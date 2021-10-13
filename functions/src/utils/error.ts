import * as functions from "firebase-functions";
import { firestore } from "../firebase/fire";
import moment = require("moment");

interface ErrorDetails {
  message: string;
  stack: string;
}

export const handleError = (
  error: any,
  endpoint: string,
  response?: functions.Response<ErrorDetails>
) => {
  firestore.collection("logs").add({
    ...error,
    endpoint,
    created: moment().format(),
  });
  console.error(error);
  response && sendErrorToClient(response, error);
};

const sendErrorToClient = (
  response: functions.Response<ErrorDetails>,
  error: ErrorDetails
) => response.status(500).send(error);
