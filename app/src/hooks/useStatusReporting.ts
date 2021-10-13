import firebase from "firebase/app";
import { useEffect } from "react";
import { useFirebase } from "react-redux-firebase";

const isOfflineForDatabase = {
  state: "offline",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};
const isOnlineForDatabase = {
  state: "online",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

export const useStatusReporting = (deviceId: string) => {
  const { database } = useFirebase();
  useEffect(() => {
    const userStatusDatabaseRef = database().ref("/status/" + deviceId);
    database()
      .ref(".info/connected")
      .on("value", async snapshot => {
        if (snapshot.val()) {
          try {
            await userStatusDatabaseRef
              .onDisconnect()
              .set(isOfflineForDatabase);
            userStatusDatabaseRef.set(isOnlineForDatabase);
          } catch (error) {
            console.error("Failed to save status to the database", error);
          }
        }
      });
  }, [deviceId, database]);
};
