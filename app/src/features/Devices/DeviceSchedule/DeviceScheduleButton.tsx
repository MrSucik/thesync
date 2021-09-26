import { Icon, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDeviceScheduleOpen } from "../../../store/slices/app";
import Tooltip from "../../../components/Tooltip";

const DeviceScheduleButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setDeviceScheduleOpen(true));
  return (
    <Tooltip title="Nastavit automatické vypínaní/restart">
      <IconButton onClick={handleClick} size="small">
        <Icon style={{ color: "#c4c4c4" }}>schedule</Icon>
      </IconButton>
    </Tooltip>
  );
};

export default DeviceScheduleButton;
