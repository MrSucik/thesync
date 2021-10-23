import { useSnackbar } from "notistack";
import { useEffect, useRef } from "react";
import {
  OrderByOptions,
  useFirestoreConnect,
  WhereOptions,
} from "react-redux-firebase";
import { useSelector } from "../store/useSelector";
import error from "../utils/error";

export const useFirestoreSubscribe = (area: string) => {
  const { enqueueSnackbar } = useSnackbar();
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
      data.powersettings &&
      data.nameday
  );
  const loaded = useRef(dataLoaded);
  useEffect(() => {
    const redirectIfNotLoaded = () => {
      if (!loaded.current) {
        error.onFirestoreFailedToLoad(enqueueSnackbar)();
      }
    };
    const timeout = setTimeout(redirectIfNotLoaded, 15 * 1000);
    return () => clearTimeout(timeout);
  });
  return dataLoaded;
};
