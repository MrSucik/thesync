import { Avatar } from "@mui/material";
import React from "react";
import StatusBadge from "../../components/StatusBadge";
import Tooltip from "../../components/Tooltip";
import { DeviceModel } from "../../definitions";
import { useStatus } from "../../hooks/useStatus";
import { getIconSource } from "../../utils/icons";

const SceneDevice: React.FC<{ device: DeviceModel }> = ({ device }) => {
  const status = useStatus(device.lastUpdateRequest);
  return (
    <Tooltip title={device.name}>
      <span>
        <StatusBadge status={status}>
          <Avatar
            sx={{ height: 24, width: 24 }}
            alt={device.name}
            src={getIconSource(device.icon)}
          />
        </StatusBadge>
      </span>
    </Tooltip>
  );
};

export default SceneDevice;
