import { DeviceModel } from "definitions";
import { useSelector } from "store/useSelector";
import { ListItemText } from "components/ListItemText";
import ListItem from "components/ListItem";
import { useDispatch } from "react-redux";
import { setConfigureDevice } from "./deviceConfigurationSlice";
import moment from "moment";
import { usePythonStatus } from "hooks/usePythonStatus";
import { czechLongDateTimeFormat } from "utils/constants";
import DeviceAvatar from "components/DeviceAvatar";
import DeviceActions from "./DeviceActions";

interface Device extends DeviceModel {
  sceneName: string;
}

const useDeviceAccess = (deviceId: string) => {
  const userDevices = useSelector(
    state =>
      state.firestore.data.users[state.firebase.auth.email + ""]?.devices || []
  );
  return userDevices.includes(deviceId);
};

const DeviceListItem: React.FC<{
  device: Device;
}> = ({ device }) => {
  const { id, name, status, sceneName, lastUpdateRequest } = device;
  const dispatch = useDispatch();

  const pythonStatus = usePythonStatus(lastUpdateRequest);
  const hasAccess = useDeviceAccess(id);

  const handleConfigureClick = () => dispatch(setConfigureDevice(id));

  return (
    <ListItem
      sx={{ paddingRight: hasAccess ? 38 * 3 + "px" : 0 }}
      disabled={!hasAccess}>
      <DeviceAvatar
        device={device}
        size={40}
        tooltip={
          <span>
            Status prohlížeče: <b>{status}</b>
            <br />
            Status zařízení: <b>{pythonStatus}</b> (poslední update:{" "}
            {!lastUpdateRequest
              ? "nikdy"
              : moment(lastUpdateRequest).format(czechLongDateTimeFormat)}
            )
          </span>
        }
      />
      <ListItemText
        sx={{ cursor: "pointer" }}
        primary={name}
        primaryTypographyProps={{ onClick: handleConfigureClick }}
        secondary={`Přehrává: ${sceneName}`}
      />
      {hasAccess && <DeviceActions deviceId={id} />}
    </ListItem>
  );
};

export default DeviceListItem;
