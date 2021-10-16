import { SceneModel } from "../definitions";
import { useSelector } from "../store/useSelector";

export const useCurrentScene = () =>
  useSelector<SceneModel>(state =>
    !state.app.selectedScene
      ? null
      : {
          id: state.app.selectedScene + "",
          ...state.firestore.data.scenes[state.app.selectedScene + ""],
        }
  );
