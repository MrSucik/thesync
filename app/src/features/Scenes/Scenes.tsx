import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { createNewSceneInDB } from "../../utils/fire";
import Title from "../../components/Title";
import { PrimaryButton } from "../../components/PrimaryButton";
import ScenesList from "./ScenesList";
import { useDispatch } from "react-redux";
import { setSelectedScene } from "../../store/slices/app";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { UserModel } from "../../definitions";

const Scenes = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const user = useCurrentUser() as UserModel;
  const handleAddScene = async () => {
    try {
      const newScene = await createNewSceneInDB(user);
      dispatch(setSelectedScene(newScene.id));
    } catch {
      enqueueSnackbar("Nepodařilo se přidat scénu", { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 2,
        paddingLeft: 2,
        overflowY: "auto",
        minWidth: 300,
      }}>
      <Title>scény</Title>
      <PrimaryButton sx={{ mt: 1, mr: 2 }} onClick={handleAddScene}>
        přidat scénu
      </PrimaryButton>
      <ScenesList />
    </Box>
  );
};

export default Scenes;
