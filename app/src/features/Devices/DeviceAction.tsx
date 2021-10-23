import { Icon, IconButton, IconButtonProps, Tooltip } from "@mui/material";

interface Props extends IconButtonProps {
  tooltip: string;
  icon: string;
}

const DeviceAction: React.FC<Props> = ({ tooltip, icon, ...props }) => {
  return (
    <Tooltip title={tooltip}>
      <IconButton size="small" {...props}>
        <Icon style={{ color: "#c4c4c4" }}>{icon}</Icon>
      </IconButton>
    </Tooltip>
  );
};

export default DeviceAction;
