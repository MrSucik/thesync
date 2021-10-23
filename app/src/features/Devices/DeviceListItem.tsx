import { Avatar, ListItemAvatar, ListItemSecondaryAction } from "@mui/material";
import { getIconSourceSvg } from "../../utils/icons";
import { DeviceModel } from "../../definitions";
import { useSelector } from "../../store/useSelector";
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
import { setDeviceSceneUpdate } from "../../store/slices/app";
import moment from "moment";
import { useStatus } from "../../hooks/useStatus";
import { czechLongDateTimeFormat } from "../../utils/constants";
import DeviceAction from "./DeviceAction";

interface Device extends DeviceModel {
  sceneName: string;
}

const DeviceListItem: React.FC<{
  device: Device;
}> = ({ device: { id, name, sceneName, icon, lastUpdateRequest, status } }) => {
  const pythonStatus = useStatus(lastUpdateRequest);

  const [hovering, setHovering] = useState(false);
  const userDevices = useSelector(
    state =>
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
  const handleChangeScene = () => dispatch(setDeviceSceneUpdate(id));
  return (
    <ListItem
      sx={{
        paddingRight: userDevices.includes(id) ? 34 * 4 + "px" : 0,
        userSelect: "none",
      }}
      disabled={!userDevices.includes(id)}
      key={id}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}>
      <Tooltip
        title={
          <span>
            Status prohlížeče: <b>{status}</b>
            <br />
            Status zařízení: <b>{pythonStatus}</b> (poslední update:{" "}
            {!lastUpdateRequest
              ? "nikdy"
              : moment(lastUpdateRequest).format(czechLongDateTimeFormat)}
            )
          </span>
        }>
        <ListItemAvatar>
          <StatusBadge status={status}>
            <StatusBadge
              status={pythonStatus}
              origin={{ vertical: "bottom", horizontal: "left" }}>
              <Avatar alt={name} src={getIconSourceSvg(icon)} />
            </StatusBadge>
          </StatusBadge>
        </ListItemAvatar>
      </Tooltip>
      <ListItemText
        sx={{ cursor: "pointer" }}
        primary={name}
        primaryTypographyProps={{ onClick: createConfigureClickHandler(id) }}
        secondary={`Přehrává: ${sceneName}`}
        secondaryTypographyProps={{ onClick: handleChangeScene }}
      />
      {userDevices.includes(id) && (
        <ListItemSecondaryAction
          sx={{
            transition: "all 200ms ease-in-out",
            opacity: hovering ? 1 : 0,
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}>
          <DeviceChangeSceneButton deviceId={id} onClick={handleChangeScene} />
          <DeviceAction
            tooltip="Konfigurovat zařízení"
            onClick={createConfigureClickHandler(id)}
            icon="settings"
          />
          <DeviceAction
            tooltip="Vypnout zařízení"
            onClick={createShutdownClickHandler(id)}
            icon="power_settings_new"
          />
          <DeviceAction
            tooltip="Restartovat zařízení"
            onClick={createRebootClickHandler(id)}
            icon="restart_alt"
          />
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default DeviceListItem;
