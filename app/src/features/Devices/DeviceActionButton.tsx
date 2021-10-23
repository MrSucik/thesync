import { Icon, IconButton, IconButtonProps } from "@mui/material";
import Tooltip from "../../components/Tooltip";

interface Props extends IconButtonProps {
  tooltip: string;
  icon: string;
}

const DeviceActionButton: React.FC<Props> = ({ tooltip, icon, ...props }) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton size="small" {...props}>
        <Icon style={{ color: "#c4c4c4" }}>{icon}</Icon>
      </IconButton>
    </Tooltip>
  );
};

export default DeviceActionButton;
