import { ListItemSecondaryAction } from "@mui/material";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { useFirestore } from "react-redux-firebase";
import { setDeviceSceneUpdate } from "../../store/slices/app";
import DeviceActionButton from "./DeviceActionButton";
import DeviceChangeSceneButton from "./DeviceChangeSceneButton";
import { setConfigureDevice } from "./deviceConfigurationSlice";

const DeviceActions: React.FC<{ deviceId: string }> = ({ deviceId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const firestore = useFirestore();

  const handleConfigureClick = () => dispatch(setConfigureDevice(deviceId));
  const handleChangeScene = () => dispatch(setDeviceSceneUpdate(deviceId));
  const handleShutdownClick = async () => {
    await firestore.update(`devices/${deviceId}`, { forceShutdown: true });
    enqueueSnackbar("Příkaz k vypnutí odeslán", { variant: "success" });
  };
  const handleRebootClick = async () => {
    await firestore.update(`devices/${deviceId}`, { forceReboot: true });
    enqueueSnackbar("Příkaz k restartování odeslán", { variant: "success" });
  };

  return (
    <ListItemSecondaryAction>
      <DeviceChangeSceneButton
        deviceId={deviceId}
        onClick={handleChangeScene}
      />
      <DeviceActionButton
        tooltip="Konfigurovat zařízení"
        onClick={handleConfigureClick}
        icon="settings"
      />
      <DeviceActionButton
        tooltip="Vypnout zařízení"
        onClick={handleShutdownClick}
        icon="power_settings_new"
      />
      <DeviceActionButton
        tooltip="Restartovat zařízení"
        onClick={handleRebootClick}
        icon="restart_alt"
      />
    </ListItemSecondaryAction>
  );
};

export default DeviceActions;
