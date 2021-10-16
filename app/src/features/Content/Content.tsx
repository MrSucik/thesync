import { Container, Modal, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store/useSelector";
import BakalariConfigurationStage from "./stages/BakalariConfigurationStage";
import ChooseTypeStage from "./stages/ChooseTypeStage";
import { setContentOpen } from "./contentSlice";
import FileUploadStage from "./stages/FileUploadStage";
import ChooseExistingStage from "./stages/ChooseExistingStage";
import MediaUpdateStage from "./stages/MediaUpdateStage";
import PreviewStage from "./stages/PreviewStage";
import ContentHeader from "./ContentHeader";

export const steps = ["VÝBĚR TYPU", "SOUBOR", "KONFIGURACE", "NÁHLED"];

const Content = () => {
  const type = useSelector(state => state.content.type);
  const contentOpen = useSelector(state => state.content.contentOpen);
  const activeStep = useSelector(state => state.content.activeStep);
  const dispatch = useDispatch();
  return (
    <Modal
      sx={{
        maxWidth: 600,
        margin: "64px auto",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        maxHeight: "calc(100% - 128px)",
      }}
      open={contentOpen}
      onClose={() => dispatch(setContentOpen(false))}>
      <Paper>
        <ContentHeader />
        <Container>
          {activeStep === 0 && <ChooseTypeStage />}
          {activeStep === 1 &&
            (type === "existing" ? (
              <ChooseExistingStage />
            ) : type === "upload" ? (
              <FileUploadStage />
            ) : type?.startsWith("bakalari-") ? (
              <BakalariConfigurationStage />
            ) : null)}
          {activeStep === 2 && <MediaUpdateStage />}
          {activeStep === 3 && <PreviewStage />}
        </Container>
      </Paper>
    </Modal>
  );
};
export default Content;
