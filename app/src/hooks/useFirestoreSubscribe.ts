import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { RootState } from "../store";

export const useFirestoreSubscribe = () => {
  useFirestoreConnect([
    { collection: "media", orderBy: ["created", "desc"] },
    {
      collection: "devices",
      orderBy: ["created", "asc"],
    },
    {
      collection: "scenes",
      orderBy: ["created", "desc"],
    },
    { collection: "users", orderBy: ["created", "asc"] },
    { collection: "powersettings", orderBy: ["updated", "desc"], limit: 1 },
  ]);
  const dataLoaded = useSelector<RootState, boolean>(
    ({ firestore: { data } }) =>
      data.devices &&
      data.scenes &&
      data.media &&
      data.users &&
      data.powersettings
  );
  return dataLoaded;
};
