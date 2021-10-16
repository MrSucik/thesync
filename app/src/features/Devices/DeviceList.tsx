import { DeviceModel } from "../../definitions";
import { useSelector } from "../../store/useSelector";
import { List } from "../../components/List";
import DeviceListItem from "./DeviceListItem";

interface Device extends DeviceModel {
  sceneName: string;
}

const DeviceList = () => {
  const devices = useSelector<Device[]>(state =>
    (state.firestore.ordered.devices as DeviceModel[]).map(d => ({
      ...d,
      sceneName: state.firestore.data.scenes[d.scene]?.name,
    }))
  );
  const userDevices = useSelector(
    state =>
      state.firestore.data.users[state.firebase.auth.email + ""]?.devices || []
  );

  return (
    <List sx={{ paddingRight: 2 }}>
      {devices
        .sort(a => (userDevices.includes(a) ? 1 : 0))
        .map(device => (
          <DeviceListItem key={device.id} device={device} />
        ))}
    </List>
  );
};

export default DeviceList;
