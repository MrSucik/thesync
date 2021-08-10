import { Icon, IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { setDeviceSceneUpdate } from "../../store/slices/app";
import Tooltip from "../../components/Tooltip";

const DeviceChangeSceneButton: React.FC<{ deviceId: string | "all" }> = ({
  deviceId,
}) => {
  const dispatch = useDispatch();
  const handleChange = () => dispatch(setDeviceSceneUpdate(deviceId));
  return (
    <Tooltip
      title={`Začít přehrávat jinou scénu${
        deviceId === "all" ? " na všech zařízeních" : ""
      }`}
    >
      <IconButton onClick={handleChange} size="small">
        <Icon style={{ color: "#c4c4c4" }}>swap_vert</Icon>
      </IconButton>
    </Tooltip>
  );
};

export default DeviceChangeSceneButton;
