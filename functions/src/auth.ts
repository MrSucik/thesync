import { app, firestore } from "./firebase/fire";

export const createDeviceToken = (deviceId: string) =>
  app.auth().createCustomToken(deviceId);

export const validateDeviceId = async (deviceId: string) => {
  if (!deviceId) {
    return false;
  }
  const { exists } = await firestore.collection("devices").doc(deviceId).get();
  if (!exists) {
    return false;
  }
  return true;
};

export const userExists = async (uid: string) =>
  (await firestore.collection("users").doc(uid).get()).exists;
