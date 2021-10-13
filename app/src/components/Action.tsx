import { Icon, IconButton, IconButtonProps, IconProps } from "@mui/material";
import React from "react";
import { dummyFunction } from "../utils/constants";
import Tooltip from "./Tooltip";

interface Props {
  icon: string;
  onClick?: () => void;
  tooltip?: string;
  iconButtonProps?: IconButtonProps;
  iconProps?: IconProps;
}

const Action: React.FC<Props> = ({
  icon,
  onClick = dummyFunction,
  tooltip,
  iconButtonProps,
  iconProps,
}) => {
  const button = (
    <IconButton
      sx={{
        margin: 1,
        ":hover": { backgroundColor: "rgba(100, 100, 100, 0.5)" },
      }}
      onClick={onClick}
      {...iconButtonProps}
    >
      <Icon {...iconProps}>{icon}</Icon>
    </IconButton>
  );
  return tooltip ? <Tooltip title={tooltip}>{button}</Tooltip> : button;
};

export default Action;
