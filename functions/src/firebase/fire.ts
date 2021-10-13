import * as admin from "firebase-admin";
import { ConfigurationModel } from "../definitions";
import serviceAccount from "../../thesync-firebase-adminsdk-zze06-035f9585f2.json";

export const app = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: serviceAccount.client_email,
    privateKey: serviceAccount.private_key,
    projectId: serviceAccount.project_id,
  }),
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
