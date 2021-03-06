import { Box } from "@mui/system";
import { useFirestore } from "react-redux-firebase";
import { useCurrentScene } from "hooks/useCurrentScene";
import { useSelector } from "store/useSelector";
import Preview from "features/Preview/Preview";
import NextBackButtons from "../NextBackButtons";

const PreviewStage = () => {
  const media = useSelector(state => state.content.updatingMedia);
  const scene = useCurrentScene();
  const firestore = useFirestore();
  const handleNextClick = () => {
    const sceneContains = scene.mediaList.includes(media.id as string);
    if (!sceneContains) {
      firestore.update(`scenes/${scene.id}`, {
        mediaList: [...scene.mediaList, media.id],
      });
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <NextBackButtons onNextClick={handleNextClick} />
      </Box>
      <Preview />
    </>
  );
};

export default PreviewStage;
