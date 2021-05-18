import React from "react";
import { Chip, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  chip: {
    marginLeft: 4,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    "&:focus": {
      backgroundColor: theme.palette.error.main,
    },
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

interface Props {
  onCancelChoosing?: () => void;
}

const ChooseChip: React.FC<Props> = ({ onCancelChoosing }) => {
  const classes = useStyles();
  return onCancelChoosing ? (
    <Chip
      className={classes.chip}
      size="small"
      label="Choose from this card"
      onDelete={onCancelChoosing}
    />
  ) : null;
};

export default ChooseChip;
