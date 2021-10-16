import moment from "moment";
import { useFirestore } from "react-redux-firebase";
import { PowerSettings, UserModel } from "../definitions";
import { useSelector } from "../store/useSelector";
import { useCurrentUser } from "./useCurrentUser";

export const usePowerSettings = () => {
  const { email, area } = useCurrentUser() as UserModel;
  const firestore = useFirestore();
  const settings = useSelector(
    state => state.firestore.ordered.powersettings[0]
  );
  const updateSettings = (changes: Partial<PowerSettings>) =>
    firestore.update("powersettings/" + area, {
      ...settings,
      author: email,
      created: moment().format(),
      ...changes,
    });
  return { powerSettings: settings, updatePowerSettings: updateSettings };
};
