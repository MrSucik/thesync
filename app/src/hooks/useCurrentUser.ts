import { UserModel } from "../definitions";
import { useSelector } from "../useSelector";

export const useCurrentUser = () =>
  useSelector<UserModel | null>(
    state => state.firestore.data.users[state.firebase.auth.email + ""] || null
  );
