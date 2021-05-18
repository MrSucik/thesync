import { IconButton } from "@material-ui/core";
import { getIconSource } from "../../utils/icons";
import { useDispatch } from "react-redux";
import { setDeviceSceneUpdate } from "../../store/slices/app";
import RoundedImage from "../../components/RoundedImage";
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
        <RoundedImage src={getIconSource("change-scene")} />
      </IconButton>
    </Tooltip>
  );
};

export default DeviceChangeSceneButton;
