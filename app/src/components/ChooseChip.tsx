import React from "react";
import { Chip } from "@mui/material";

interface Props {
  onCancelChoosing?: () => void;
}

const ChooseChip: React.FC<Props> = ({ onCancelChoosing }) => {
  return onCancelChoosing ? (
    <Chip
      sx={{
        marginLeft: 1,
        backgroundColor: "error.main",
        color: "error.contrastText",
        "::focus": { backgroundColor: "error.main" },
        "::hover": { backgroundColor: "error.dark" },
      }}
      size="small"
      label="Choose from this card"
      onDelete={onCancelChoosing}
    />
  ) : null;
};

export default ChooseChip;
