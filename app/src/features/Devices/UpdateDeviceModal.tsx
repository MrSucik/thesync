import { Modal, Paper, createStyles, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store";
import { setConfigureDevice } from "./deviceConfigurationSlice";
import UpdateDeviceForm from "./UpdateDeviceForm";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      width: 420,
      margin: "16px auto 16px auto",
      overflow: "auto",
    },
  })
);

const UpdateDeviceModal = () => {
  const classes = useStyles();
  const updateDeviceId = useSelector(
    (state) => state.deviceConfiguration.updateDevice
  );
  const updateDevice = useSelector(
    (state) => state.firestore.data.devices[updateDeviceId + ""]
  );
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setConfigureDevice(null));
  return (
    <Modal open={Boolean(updateDeviceId)} onClose={handleClose}>
      <Paper className={classes.container}>
        {updateDevice && (
          <UpdateDeviceForm
            updateDevice={{ ...updateDevice, id: updateDeviceId }}
          />
        )}
      </Paper>
    </Modal>
  );
};

export default UpdateDeviceModal;
