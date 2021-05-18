import {
  Icon,
  IconButton,
  IconButtonProps,
  IconProps,
  withStyles,
} from "@material-ui/core";
import React from "react";
import Tooltip from "./Tooltip";

const IconButtonAction = withStyles(() => ({
  root: {
    margin: 8,
    "&:hover": {
      backgroundColor: "rgba(100, 100, 100, 0.5)",
    },
  },
}))(IconButton);

interface Props {
  icon: string;
  onClick?: () => void;
  tooltip?: string;
  iconButtonProps?: IconButtonProps;
  iconProps?: IconProps;
}

const Action: React.FC<Props> = ({
  icon,
  onClick = () => {},
  tooltip,
  iconButtonProps,
  iconProps,
}) => {
  const button = (
    <IconButtonAction onClick={onClick} {...iconButtonProps}>
      <Icon {...iconProps}>{icon}</Icon>
    </IconButtonAction>
  );
  return tooltip ? <Tooltip title={tooltip}>{button}</Tooltip> : button;
};
export default Action;
