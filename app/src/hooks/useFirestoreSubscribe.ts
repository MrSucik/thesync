import {
  OrderByOptions,
  useFirestoreConnect,
  WhereOptions,
} from "react-redux-firebase";
import { useSelector } from "../store/useSelector";

export const useFirestoreSubscribe = (area: string) => {
  const selectArea = {
    where: ["area", "==", area] as WhereOptions | WhereOptions[],
  };
  const orderByCreated = {
    orderBy: ["created", "desc"] as OrderByOptions | OrderByOptions[],
  };
  const connectCollection = (collection: string, omitArea = false) => ({
    collection,
    ...(omitArea ? {} : selectArea),
    ...orderByCreated,
  });
  useFirestoreConnect([
    connectCollection("media"),
    connectCollection("devices", true),
    connectCollection("scenes"),
    connectCollection("users"),
    connectCollection("powersettings"),
  ]);
  const dataLoaded = useSelector<boolean>(
    ({ firestore: { data } }) =>
      data.media &&
      data.devices &&
      data.scenes &&
      data.users &&
      data.powersettings
  );
  return dataLoaded;
};
