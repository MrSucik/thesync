import DeviceList from "./DeviceList";
import { Box } from "@mui/material";
import Title from "../../components/Title";
import ConfirmationDialog from "./DeviceChangeSceneDialog";
import UpdateDeviceModal from "./UpdateDeviceModal";
import DeviceChangeSceneButton from "./DeviceChangeSceneButton";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import DeviceScheduleButton from "./DeviceSchedule/DeviceScheduleButton";
import DeviceScheduleDialog from "./DeviceSchedule/DeviceScheduleDialog";
import { useDispatch } from "react-redux";
import { setDeviceSceneUpdate } from "../../store/slices/app";

const Device = () => {
  const user = useCurrentUser();
  const dispatch = useDispatch();
  const handleChangeScene = () => dispatch(setDeviceSceneUpdate("all"));
  return (
    <>
      {user && (
        <>
          <ConfirmationDialog />
          <DeviceScheduleDialog />
          <UpdateDeviceModal />
        </>
      )}
      <Box
        sx={{
          minWidth: "20rem",
          flex: 2,
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            paddingRight: 2,
          }}>
          <Title>zařízení</Title>
          {user?.bigD && (
            <Box>
              <DeviceScheduleButton />
              <DeviceChangeSceneButton
                deviceId="all"
                onClick={handleChangeScene}
              />
            </Box>
          )}
        </Box>
        <DeviceList />
      </Box>
    </>
  );
};

export default Device;
