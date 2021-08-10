import {
  Avatar,
  Icon,
  IconButton,
  ListItemAvatar,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { getIconSource } from "../../utils/icons";
import { DeviceModel } from "../../definitions";
import { useSelector } from "../../store";
import StatusBadge from "../../components/StatusBadge";
import { ListItemText } from "../../components/ListItemText";
import ListItem from "../../components/ListItem";
import DeviceChangeSceneButton from "./DeviceChangeSceneButton";
import { useDispatch } from "react-redux";
import { setConfigureDevice } from "./deviceConfigurationSlice";
import Tooltip from "../../components/Tooltip";
import { useFirestore } from "react-redux-firebase";
import { useSnackbar } from "notistack";
import { useState } from "react";

interface Device extends DeviceModel {
  sceneName: string;
}

const DeviceListItem: React.FC<{
  device: Device;
}> = ({ device: { id, name, sceneName, status, icon } }) => {
  const [hovering, setHovering] = useState(false);
  const userDevices = useSelector(
    (state) =>
      state.firestore.data.users[state.firebase.auth.email + ""]?.devices || []
  );
  const dispatch = useDispatch();
  const createConfigureClickHandler = (id: string) => () =>
    dispatch(setConfigureDevice(id));

  const firestore = useFirestore();
  const { enqueueSnackbar } = useSnackbar();
  const createShutdownClickHandler = (id: string) => async () => {
    await firestore.update(`devices/${id}`, { forceShutdown: true });
    enqueueSnackbar("Příkaz k vypnutí odeslán", { variant: "success" });
  };
  const createRebootClickHandler = (id: string) => async () => {
    await firestore.update(`devices/${id}`, { forceReboot: true });
    enqueueSnackbar("Příkaz k restartování odeslán", { variant: "success" });
  };
  return (
    <ListItem
      style={{
        paddingRight: hovering && userDevices.includes(id) ? 34 * 4 : 0,
      }}
      disabled={!userDevices.includes(id)}
      key={id}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <ListItemAvatar>
        <StatusBadge status={status}>
          <Avatar alt={name} src={getIconSource(icon)} />
        </StatusBadge>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={`Přehrává: ${sceneName}`} />
      {userDevices.includes(id) && (
        <ListItemSecondaryAction
          style={{
            transition: "all 200ms ease-in-out",
            opacity: hovering ? 1 : 0,
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <DeviceChangeSceneButton deviceId={id} />
          <Tooltip title="Konfigurovat zařízení">
            <IconButton onClick={createConfigureClickHandler(id)} size="small">
              <Icon style={{ color: "#c4c4c4" }}>settings</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Vypnout zařízení">
            <IconButton onClick={createShutdownClickHandler(id)} size="small">
              <Icon style={{ color: "#c4c4c4" }}>power_settings_new</Icon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Restartovat zařízení">
            <IconButton onClick={createRebootClickHandler(id)} size="small">
              <Icon style={{ color: "#c4c4c4" }}>restart_alt</Icon>
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default DeviceListItem;
