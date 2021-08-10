import DeviceList from "./DeviceList";
import { Box, withStyles } from "@material-ui/core";
import Title from "../../components/Title";
import ConfirmationDialog from "./DeviceChangeSceneDialog";
import UpdateDeviceModal from "./UpdateDeviceModal";
import DeviceChangeSceneButton from "./DeviceChangeSceneButton";
import { useCurrentUser } from "../../hooks/useCurrentUser";

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
  return (
    <>
      <ConfirmationDialog />
      <UpdateDeviceModal />
      <Container>
        <Box display="flex" justifyContent="space-between" pr={2}>
          <Title>zařízení</Title>
          {user?.bigD && <DeviceChangeSceneButton deviceId="all" />}
        </Box>
        <DeviceList />
      </Container>
    </>
  );
};

export default Device;
