import { Box, withStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { createNewScene } from "../../utils/fire";
import Title from "../../components/Title";
import { PrimaryButton } from "../../components/PrimaryButton";
import ScenesList from "./ScenesList";
import { useDispatch } from "react-redux";
import { setSelectedScene } from "../../store/slices/app";

const ScenesContainer = withStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 2,
    paddingLeft: 16,
    overflowY: "auto",
    minWidth: 300,
  },
})(Box);

const Scenes = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const handleAddScene = async () => {
    try {
      const newScene = await createNewScene();
      dispatch(setSelectedScene(newScene.id));
    } catch {
      enqueueSnackbar("Nepodařilo se přidat scénu", { variant: "error" });
    }
  };

  return (
    <ScenesContainer>
      <Title>scény</Title>
      <PrimaryButton onClick={handleAddScene}>přidat scénu</PrimaryButton>
      <ScenesList />
    </ScenesContainer>
  );
};

export default Scenes;
