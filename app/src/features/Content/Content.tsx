import {
  Modal,
  Paper,
  Step,
  StepLabel,
  Stepper,
  withStyles,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";
import BakalariConfigurationStage from "./stages/BakalariConfigurationStage";
import ChooseTypeStage from "./stages/ChooseTypeStage";
import { ContentType, setContentOpen } from "./contentSlice";
import FileUploadStage from "./stages/FileUploadStage";
import ChooseExistingStage from "./stages/ChooseExistingStage";
import MediaUpdateStage from "./stages/MediaUpdateStage";
import PreviewStage from "./stages/PreviewStage";

export const steps = ["VÝBĚR TYPU", "SOUBOR", "KONFIGURACE", "NÁHLED"];

const Container = withStyles({
  root: {
    maxWidth: 560,
    margin: "64px auto",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    maxHeight: "calc(100% - 128px)",
  },
})(Paper);

const Content = () => {
  const type = useSelector<ContentType | undefined>(
    (state) => state.content.type
  );
  const contentOpen = useSelector<boolean>(
    (state) => state.content.contentOpen
  );
  const activeStep = useSelector<number>((state) => state.content.activeStep);
  const dispatch = useDispatch();
  return (
    <Modal open={contentOpen} onClose={() => dispatch(setContentOpen(false))}>
      <Container>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step active={index === activeStep} key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
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
    </Modal>
  );
};
export default Content;
