import { ListItemSecondaryAction, Menu, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import { useRef, useState } from "react";
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

  const powerMenuButtonRef = useRef<HTMLButtonElement | null>(null);
  const [powerMenuOpen, setPowerMenuOpen] = useState(false);

  const handleConfigureClick = () => dispatch(setConfigureDevice(deviceId));
  const handleChangeScene = () => dispatch(setDeviceSceneUpdate(deviceId));
  const createMenuClickHandler =
    (data: Partial<unknown>, message: string) => async () => {
      await firestore.update(`devices/${deviceId}`, data);
      enqueueSnackbar(message, { variant: "success" });
      setPowerMenuOpen(false);
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
        ref={powerMenuButtonRef}
        tooltip="Vypnout nebo restartovat zařízení"
        onClick={() => setPowerMenuOpen(true)}
        icon="power_settings_new"
      />
      <Menu
        anchorEl={powerMenuButtonRef.current}
        open={powerMenuOpen}
        onClose={() => setPowerMenuOpen(false)}>
        <MenuItem
          onClick={createMenuClickHandler(
            { forceReboot: true },
            "Příkaz k restartování odeslán"
          )}>
          Restartovat zařízení
        </MenuItem>
        <MenuItem
          onClick={createMenuClickHandler(
            { forceShutdown: true },
            "Příkaz k vypnutí odeslán"
          )}>
          Vypnout zařízení
        </MenuItem>
      </Menu>
    </ListItemSecondaryAction>
  );
};

export default DeviceActions;
