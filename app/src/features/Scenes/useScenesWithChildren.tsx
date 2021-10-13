import { useSelector } from "react-redux";
import { DeviceModel, Scene } from "../../definitions";
import { RootState } from "../../store";

export const useScenesWithChildren = () => {
  const scenes = useSelector<RootState, Scene[]>(state =>
    state.firestore.ordered.scenes.map(scene => {
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
