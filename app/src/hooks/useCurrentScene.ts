import { useSelector } from "react-redux";
import { SceneModel } from "../definitions";
import { RootState } from "../store";

export const useCurrentScene = () =>
  useSelector<RootState, SceneModel>(state =>
    !state.app.selectedScene
      ? null
      : {
          id: state.app.selectedScene + "",
          ...state.firestore.data.scenes[state.app.selectedScene + ""],
        }
  );
