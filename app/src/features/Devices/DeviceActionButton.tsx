import { Icon, IconButton, IconButtonProps } from "@mui/material";
import { forwardRef } from "react";
import Tooltip from "components/Tooltip";

interface Props extends IconButtonProps {
  tooltip: string;
  icon: string;
}

const DeviceActionButton: React.FC<Props> = forwardRef(
  ({ tooltip, icon, ...props }, ref) => {
    return (
      <Tooltip title={tooltip}>
        <IconButton ref={ref} size="small" {...props}>
          <Icon style={{ color: "#c4c4c4" }}>{icon}</Icon>
        </IconButton>
      </Tooltip>
    );
  }
);

DeviceActionButton.displayName = "DeviceActionButton";

export default DeviceActionButton;
