import { app, firestore } from "./fire";

export const createDeviceToken = (deviceId: string) =>
  app.auth().createCustomToken(deviceId);

export const validateDeviceId = async (deviceId: string) => {
  const { exists } = await firestore.collection("devices").doc(deviceId).get();
  if (!exists) {
    return false;
  }
  return true;
};
