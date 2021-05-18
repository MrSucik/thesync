import { withStyles, Box, Avatar } from "@material-ui/core";
import React from "react";
import StatusBadge from "../../components/StatusBadge";
import Tooltip from "../../components/Tooltip";
import { DeviceModel } from "../../definitions";
import { getIconSource } from "../../utils/icons";

const DevicesContainer = withStyles({ root: { display: "flex", gap: 4 } })(Box);
const SmallAvatar = withStyles({ root: { height: 24, width: 24 } })(Avatar);

const SceneDevices: React.FC<{ devices: DeviceModel[] }> = ({ devices }) => (
  <DevicesContainer>
    {devices.map((device) => (
      <Tooltip key={device.id} title={device.name}>
        <span>
          <StatusBadge status={device.status}>
            <SmallAvatar alt={device.name} src={getIconSource(device.icon)} />
          </StatusBadge>
        </span>
      </Tooltip>
    ))}
  </DevicesContainer>
);

export default SceneDevices;
