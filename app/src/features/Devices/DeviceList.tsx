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
import { List } from "../../components/List";
import StatusBadge from "../../components/StatusBadge";
import { ListItemText } from "../../components/ListItemText";
import ListItem from "../../components/ListItem";
import DeviceChangeSceneButton from "./DeviceChangeSceneButton";
import { useDispatch } from "react-redux";
import { setConfigureDevice } from "./deviceConfigurationSlice";
import Tooltip from "../../components/Tooltip";
import RoundedImage from "../../components/RoundedImage";
import { useFirestore } from "react-redux-firebase";
import { useSnackbar } from "notistack";

interface Device extends DeviceModel {
  sceneName: string;
}

const DeviceList = () => {
  const devices = useSelector<Device[]>((state) =>
    state.firestore.ordered.devices.map((d) => ({
      ...d,
      sceneName: state.firestore.data.scenes[d.scene]?.name,
    }))
  );
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
  return (
    <List style={{ paddingRight: 16 }}>
      {devices
        .sort((a) => (userDevices.includes(a) ? 1 : 0))
        .map(({ id, name, icon, status, sceneName }) => (
          <ListItem
            style={{ paddingRight: userDevices.includes(id) ? 108 : 0 }}
            disabled={!userDevices.includes(id)}
            key={id}
          >
            <ListItemAvatar>
              <StatusBadge status={status}>
                <Avatar alt={name} src={getIconSource(icon)} />
              </StatusBadge>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={`Přehrává: ${sceneName}`} />
            {userDevices.includes(id) && (
              <ListItemSecondaryAction>
                <DeviceChangeSceneButton deviceId={id} />
                <Tooltip title="Konfigurovat zařízení">
                  <IconButton
                    onClick={createConfigureClickHandler(id)}
                    size="small"
                  >
                    <Icon style={{ color: "#c4c4c4" }}>settings</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Vypnout zařízení">
                  <IconButton
                    onClick={createShutdownClickHandler(id)}
                    size="small"
                  >
                    <Icon style={{ color: "#c4c4c4" }}>power_settings_new</Icon>
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
    </List>
  );
};

export default DeviceList;
