import { Avatar } from "@mui/material";
import { DeviceModel } from "../definitions";
// import { usePythonStatus } from "../hooks/usePythonStatus";
import { getIconSourceSvg } from "../utils/icons";
// import StatusBadge from "./StatusBadge";
import Tooltip from "./Tooltip";

const DeviceAvatar: React.FC<{
  device: DeviceModel;
  tooltip?: React.ReactChild | React.ReactFragment | React.ReactPortal;
  size?: number;
}> = ({
  device: { name, icon },
  tooltip = name,
  size = 24,
}) => {
  // const pythonStatus = usePythonStatus(lastUpdateRequest);
  return (
    <Tooltip title={tooltip}>
      <span>
        {/* <StatusBadge
          size={size > 24 ? 8 : 6}
          status={pythonStatus}
          origin={{ vertical: "bottom", horizontal: "left" }}> */}
          <Avatar
            sx={{ height: size, width: size }}
            alt={icon}
            src={getIconSourceSvg(icon)}
          />
        {/* </StatusBadge> */}
      </span>
    </Tooltip>
  );
};
export default DeviceAvatar;
