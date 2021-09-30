import * as admin from "firebase-admin";
import { ConfigurationModel } from "../definitions";

const serviceAccount = require("../../thesync-firebase-adminsdk-zze06-035f9585f2.json");

export const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const firestore = app.firestore();
export const storage = app.storage();
export const bucket = storage.bucket("thesync.appspot.com");

export const getConfiguration = async () =>
  (
    await firestore
      .collection("configuration")
      .orderBy("created", "desc")
      .limit(1)
      .get()
  ).docs[0].data() as ConfigurationModel;

