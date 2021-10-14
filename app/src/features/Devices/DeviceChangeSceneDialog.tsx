import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { useScenesWithChildren } from "../Scenes/useScenesWithChildren";
import SceneListItem from "../Scenes/SceneListItem";
import { List } from "../../components/List";
import { useDispatch } from "react-redux";
import { useSelector } from "../../useSelector";
import { setDeviceSceneUpdate } from "../../store/slices/app";
import { useFirestore } from "react-redux-firebase";

const DeviceChangeSceneDialog = () => {
  const dispatch = useDispatch();
  const handleCancel = () => dispatch(setDeviceSceneUpdate(""));
  const firestore = useFirestore();
  const deviceId = useSelector(state => state.app.deviceSceneUpdate);
  const device = useSelector(state => ({
    id: deviceId,
    ...state.firestore.data.devices[deviceId],
  }));
  const allDevices = useSelector(state =>
    Object.keys(state.firestore.data.devices)
  );
  const scenes = useScenesWithChildren();
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    if (deviceId) {
      setSelectedIndex(scenes.findIndex(x => x.id === device.scene));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceId, setSelectedIndex]);
  const handleOk = () => {
    handleCancel();
    const updatedScene = { scene: scenes[selectedIndex].id };
    if (deviceId === "all") {
      allDevices.forEach(id => firestore.update(`devices/${id}`, updatedScene));
    } else {
      firestore.update(`devices/${device.id}`, updatedScene);
    }
  };
  return (
    <Dialog disableEscapeKeyDown open={Boolean(deviceId)}>
      <DialogTitle>
        Vybrat scénu pro
        <b>{deviceId === "all" ? " všechna zařízení" : ": " + device.name}</b>
      </DialogTitle>
      <DialogContent dividers>
        <List>
          {scenes.map((s, index) => (
            <SceneListItem
              key={s.id}
              scene={s}
              onClick={() => setSelectedIndex(index)}
              selected={selectedIndex === index}
            />
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          zrušit
        </Button>
        <Button onClick={handleOk}>vybrat</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeviceChangeSceneDialog;
