import { DialogTitle, Step, StepLabel, Stepper, Box } from "@mui/material";
import { useSelector } from "store/useSelector";

export const steps = ["VÝBĚR TYPU", "SOUBOR", "KONFIGURACE", "NÁHLED"];

const ContentHeader = () => {
  const activeStep = useSelector(state => state.content.activeStep);
  return (
    <Box sx={{ background: "#fff2" }}>
      <DialogTitle>Přidat mediální obsah do scény</DialogTitle>
      <Stepper sx={{ padding: 2 }} activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step active={index === activeStep} key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
export default ContentHeader;
