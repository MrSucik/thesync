import axios from "axios";
import * as functions from "firebase-functions";
import { firestore } from "../firebase/fire";

type ResponseData = [{ date: string; name: string }];

const client = axios.create({ baseURL: "https://svatky.adresa.info/" });

const loadNameDay = async () => {
  const { data } = await client.get<ResponseData>("json");
  const docData = { name: data[0].name, date: data[0].date };
  await firestore.doc("nameday/current").update(docData);
};

export const scheduledNameDayUpdate = functions
  .region("europe-west3")
  .runWith({ memory: "512MB", timeoutSeconds: 30 })
  .pubsub.schedule("every 2 hours")
  .onRun(loadNameDay);
