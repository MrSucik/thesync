import { Box } from "@mui/material";
import React from "react";
import DeviceAvatar from "components/DeviceAvatar";
import { DeviceModel } from "definitions";

const SceneDevices: React.FC<{ devices: DeviceModel[] }> = ({ devices }) => (
  <Box sx={{ display: "flex", gap: 1 }}>
    {devices.map(device => (
      <DeviceAvatar key={device.id} device={device} />
    ))}
  </Box>
);

export default SceneDevices;
