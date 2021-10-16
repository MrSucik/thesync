import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store/useSelector";
import { dummyFunction } from "../../utils/constants";
import { steps } from "./Content";
import { setActiveStep, setContentOpen } from "./contentSlice";

const NextBackButtons: React.FC<{
  nextHidden?: boolean;
  onNextClick?: (() => Promise<void>) | (() => void);
  backHidden?: boolean;
  onBackClick?: () => void;
}> = ({
  backHidden,
  nextHidden,
  onBackClick = dummyFunction,
  onNextClick = dummyFunction,
}) => {
  const loading = useSelector(state => state.content.bakalariFileLoading);
  const activeStep = useSelector(state => state.content.activeStep);
  const dispatch = useDispatch();
  const handleNextClick = async () => {
    await onNextClick();
    dispatch(setActiveStep(activeStep + 1));
    if (steps.length - 1 === activeStep) {
      dispatch(setContentOpen(false));
    }
  };
  const handleBackClick = () => {
    dispatch(setActiveStep(activeStep - 1));
    onBackClick();
  };
  return backHidden && nextHidden ? null : (
    <Box
      sx={{ display: "flex", justifyContent: "flex-end", padding: 3, gap: 1 }}>
      {!backHidden && <Button onClick={handleBackClick}>zpět</Button>}
      {!nextHidden && (
        <Button
          disabled={loading}
          variant="contained"
          color="primary"
          onClick={handleNextClick}>
          {activeStep === steps.length - 1 ? (
            "dokončit"
          ) : loading ? (
            <CircularProgress size="16px" color="inherit" />
          ) : (
            "další"
          )}
        </Button>
      )}
    </Box>
  );
};

export default NextBackButtons;
