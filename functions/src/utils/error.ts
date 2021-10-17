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
  functions.logger.error(error);
  firestore.collection("logs").add({
    ...error,
    endpoint,
    created: moment().format(),
  });
  console.error(error);
  response && sendErrorToClient(response, error);
};

const serialize = (a: unknown) =>
  JSON.parse(JSON.stringify(a, Object.getOwnPropertyNames(a)));

const escape = (s?: string) => {
  return ("" + s) /* Forces the conversion to string. */
    .replace(/\\/g, "\\\\") /* This MUST be the 1st replacement. */
    .replace(/\t/g, "\\t") /* These 2 replacements protect whitespaces. */
    .replace(/\n/g, "\\n")
    .replace(/\u00A0/g, "\\u00A0") /* Useful but not absolutely necessary. */
    .replace(/&/g, "\\x26") /* These 5 replacements protect from HTML/XML. */
    .replace(/'/g, "\\x27")
    .replace(/"/g, "\\x22")
    .replace(/</g, "\\x3C")
    .replace(/>/g, "\\x3E");
};

const sendErrorToClient = (
  response: functions.Response<ErrorDetails>,
  error: ErrorDetails
) => response.status(500).send(escape(JSON.stringify(serialize(error))));
