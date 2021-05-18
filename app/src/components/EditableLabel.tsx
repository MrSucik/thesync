import {
  Box,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import Action from "./Action";
import Tooltip from "./Tooltip";

const useStyles = makeStyles(() => ({
  labelContainer: {
    padding: "0 4px",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    border: "solid 1px transparent",
    cursor: "pointer",
    transition: "all 350ms ease-in-out",
    "&:hover": {
      border: "solid 1px white",
      background: "rgba(240,240,240,.1)",
    },
  },
}));

interface Props {
  value: string;
  onChange?: (value: string) => void;
}

const EditableLabel: React.FC<Props> = ({ onChange, value }) => {
  const classes = useStyles();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const handleEditClick = () => setInputVisible(true);
  const handleConfirmClick = () => {
    onChange && onChange(inputValue);
    setInputVisible(false);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleConfirmClick();
    }
  };
  const title = <Typography variant="button">{value}</Typography>;
  return inputVisible ? (
    <Box position="relative">
      <TextField
        inputProps={{ style: { color: "white" } }}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Action
        tooltip="Rename"
        icon="done"
        iconButtonProps={{
          color: "inherit",
          size: "small",
          style: {
            position: "absolute",
            right: 4,
          },
        }}
        onClick={handleConfirmClick}
      />
    </Box>
  ) : onChange ? (
    <Tooltip title="Rename">
      <Box onClick={handleEditClick} className={classes.labelContainer}>
        {title}
      </Box>
    </Tooltip>
  ) : (
    title
  );
};
export default EditableLabel;
