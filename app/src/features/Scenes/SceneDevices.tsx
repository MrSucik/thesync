import { Box } from "@mui/material";
import React from "react";
import { DeviceModel } from "../../definitions";
import SceneDevice from "./SceneDevice";

const SceneDevices: React.FC<{ devices: DeviceModel[] }> = ({ devices }) => (
  <Box sx={{ display: "flex", gap: 1 }}>
    {devices.map((device) => (
      <SceneDevice key={device.id} device={device} />
    ))}
  </Box>
);

export default SceneDevices;
