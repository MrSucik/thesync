import { Modal, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { DeviceModel } from "../../definitions";
import { useSelector } from "../../store";
import { setConfigureDevice } from "./deviceConfigurationSlice";
import UpdateDeviceForm from "./UpdateDeviceForm";

const UpdateDeviceModal = () => {
  const updateDeviceId = useSelector(
    (state) => state.deviceConfiguration.updateDevice
  ) as string;
  const updateDevice: DeviceModel = useSelector(
    (state) => state.firestore.data.devices[updateDeviceId + ""]
  );
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setConfigureDevice(null));
  return (
    <Modal open={Boolean(updateDeviceId)} onClose={handleClose}>
      <Paper
        sx={{ width: 420, margin: "16px auto 16px auto", overflow: "auto" }}
      >
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
