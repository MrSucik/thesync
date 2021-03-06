import { Icon, IconButton } from "@mui/material";
import Tooltip from "components/Tooltip";

const DeviceChangeSceneButton: React.FC<{
  deviceId: string | "all";
  onClick: () => void;
}> = ({ deviceId, onClick }) => (
  <Tooltip
    title={`Začít přehrávat jinou scénu${
      deviceId === "all" ? " na všech zařízeních" : ""
    }`}>
    <IconButton onClick={onClick} size="small">
      <Icon sx={{ color: "#c4c4c4" }}>swap_vert</Icon>
    </IconButton>
  </Tooltip>
);

export default DeviceChangeSceneButton;
