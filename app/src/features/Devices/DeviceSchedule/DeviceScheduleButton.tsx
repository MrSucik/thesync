import { useDispatch } from "react-redux";
import { setDeviceScheduleOpen } from "../../../store/slices/app";
import DeviceActionButton from "../DeviceActionButton";

const DeviceScheduleButton = () => {
  const dispatch = useDispatch();
  const handleClick = () => dispatch(setDeviceScheduleOpen(true));
  return (
    <DeviceActionButton
      onClick={handleClick}
      tooltip="Nastavit automatické vypínaní/restart"
      icon="schedule"
    />
  );
};

export default DeviceScheduleButton;
