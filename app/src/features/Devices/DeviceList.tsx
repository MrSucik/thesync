import {
  Avatar,
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
  const createConfigureClickHandler = (id: string) => () => {
    dispatch(setConfigureDevice(id));
  };
  return (
    <List style={{ paddingRight: 16 }}>
      {devices
        .sort((a) => (userDevices.includes(a) ? 1 : 0))
        .map(({ id, name, icon, status, sceneName }) => (
          <ListItem
            style={{ paddingRight: userDevices.includes(id) ? 86 : 0 }}
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
                <Tooltip title="Konfigurovat toto zařízení">
                  <IconButton
                    onClick={createConfigureClickHandler(id)}
                    size="small"
                  >
                    <RoundedImage src={getIconSource("settings")} />
                  </IconButton>
                </Tooltip>
                <DeviceChangeSceneButton deviceId={id} />
              </ListItemSecondaryAction>
            )}
          </ListItem>
        ))}
    </List>
  );
};

export default DeviceList;
