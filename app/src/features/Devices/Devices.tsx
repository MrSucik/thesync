import DeviceList from "./DeviceList";
import { Box, withStyles } from "@material-ui/core";
import Title from "../../components/Title";
import ConfirmationDialog from "./DeviceChangeSceneDialog";
import UpdateDeviceModal from "./UpdateDeviceModal";
import DeviceChangeSceneButton from "./DeviceChangeSceneButton";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import DeviceScheduleButton from "./DeviceSchedule/DeviceScheduleButton";
import DeviceScheduleDialog from "./DeviceSchedule/DeviceScheduleDialog";
import { useDispatch } from "react-redux";
import { setDeviceSceneUpdate } from "../../store/slices/app";

const Container = withStyles({
  root: {
    minWidth: "20rem",
    flex: 2,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
})(Box);

const Device = () => {
  const user = useCurrentUser();
  const dispatch = useDispatch();
  const handleChangeScene = () => dispatch(setDeviceSceneUpdate("all"));
  return (
    <>
      <ConfirmationDialog />
      <DeviceScheduleDialog />
      <UpdateDeviceModal />
      <Container>
        <Box display="flex" justifyContent="space-between" pr={2}>
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
      </Container>
    </>
  );
};

export default Device;
