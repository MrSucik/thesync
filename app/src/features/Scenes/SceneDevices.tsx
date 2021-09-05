import { withStyles, Box } from "@material-ui/core";
import React from "react";
import { DeviceModel } from "../../definitions";
import SceneDevice from "./SceneDevice";

const DevicesContainer = withStyles({ root: { display: "flex", gap: 4 } })(Box);

const SceneDevices: React.FC<{ devices: DeviceModel[] }> = ({ devices }) => (
  <DevicesContainer>
    {devices.map((device) => (
      <SceneDevice key={device.id} device={device} />
    ))}
  </DevicesContainer>
);

export default SceneDevices;
