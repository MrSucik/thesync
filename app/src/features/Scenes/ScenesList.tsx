import { List } from "../../components/List";
import { useScenesWithChildren } from "./useScenesWithChildren";
import SceneListItem from "./SceneListItem";
import { useDispatch } from "react-redux";
import { useSelector } from "../../useSelector";
import { setSelectedScene } from "../../store/slices/app";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useSnackbar } from "notistack";

const ScenesList = () => {
  const user = useCurrentUser();
  const inaccessibleScenes = useSelector<string[]>(state => [
    ...new Set(
      Object.keys(state.firestore.data.devices)
        .filter(x => !user?.devices.includes(x))
        .map(x => state.firestore.data.devices[x].scene)
    ),
  ]);
  const { enqueueSnackbar } = useSnackbar();
  const scenes = useScenesWithChildren();
  const selectedScene = useSelector(state => state.app.selectedScene);
  const dispatch = useDispatch();
  const createClickHandler = (id: string) => () => {
    const hasAccess = !inaccessibleScenes.includes(id);
    if (hasAccess) {
      dispatch(setSelectedScene(id));
    } else {
      enqueueSnackbar("Nemáte právo upravovat tuto scénu.", {
        variant: "error",
      });
    }
  };
  return (
    <List sx={{ paddingRight: 2 }}>
      {scenes.map(scene => (
        <SceneListItem
          key={scene.id}
          scene={scene}
          onClick={createClickHandler(scene.id)}
          selected={selectedScene === scene.id}
        />
      ))}
    </List>
  );
};

export default ScenesList;
