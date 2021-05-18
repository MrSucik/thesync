import { useEffect, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import client from "../utils/client";

export const useDeviceAccess = () => {
  const [loading, setLoading] = useState(true);
  const { deviceId } = useParams<{ deviceId: string }>();
  console.log(deviceId);
  const firebase = useFirebase();
  useEffect(() => {
    const updateToken = async () => {
      setLoading(true);
      await firebase.auth().signOut();
      const { data } = await client.deviceAccess(deviceId);
      await firebase.auth().signInWithCustomToken(data);
      setLoading(false);
    };
    updateToken();
  }, [deviceId, firebase]);
  return { loading };
};
