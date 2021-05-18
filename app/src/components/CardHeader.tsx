import React from "react";
import { Box, IconButtonProps, makeStyles } from "@material-ui/core";
import ChooseChip from "./ChooseChip";
import clsx from "clsx";
import Action from "./Action";
import EditableLabel from "./EditableLabel";

const useStyles = makeStyles((theme) => ({
  container: {
    color: "white",
    height: 40,
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.09);",
    borderRadius: 4,
    backgroundColor: theme.palette.primary.main,
  },
  sideMargin: {
    margin: "0 7px",
  },
}));

interface Props {
  title?: string;
  actions?: {
    tooltip: string;
    icon: string;
    onClick: () => void;
  }[];
  onChangeTitle?: (newTitle: string) => void;
  onCancelChoosing?: () => void;
  sideMargin?: boolean;
}

const iconButtonProps: IconButtonProps = {
  color: "inherit",
  size: "small",
};

const CardHeader: React.FC<Props> = ({
  title = "",
  onChangeTitle,
  children,
  actions = [],
  onCancelChoosing,
  sideMargin,
}) => {
  const classes = useStyles();
  return (
    <Box className={clsx(classes.container, sideMargin && classes.sideMargin)}>
      <EditableLabel value={title} onChange={onChangeTitle} />
      <ChooseChip onCancelChoosing={onCancelChoosing} />
      {children}
      <Box display="flex">
        {actions.map(({ icon, tooltip, onClick }, index) => (
          <Action
            key={index}
            tooltip={tooltip}
            onClick={onClick}
            icon={icon}
            iconButtonProps={iconButtonProps}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CardHeader;
