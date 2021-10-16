import { DeviceModel, Scene, SceneModel } from "../../definitions";
import { useSelector } from "../../store/useSelector";

export const useScenesWithChildren = () => {
  const scenes = useSelector<Scene[]>(state =>
    state.firestore.ordered.scenes.map((scene: SceneModel) => {
      const mediaList = (
        (state.app.optimisticReorderUpdate?.sceneId === scene.id
          ? state.app.optimisticReorderUpdate?.mediaList
          : scene.mediaList) || []
      ).map((mediaId: string) => ({
        id: mediaId,
        ...state.firestore.data.media[mediaId],
      }));
      const devicesList = state.firestore.ordered.devices.filter(
        (d: DeviceModel) => d.scene === scene.id
      );
      return { ...scene, mediaList, devicesList };
    })
  );
  return scenes;
};
