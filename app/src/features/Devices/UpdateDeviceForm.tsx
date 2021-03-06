import {
  Box,
  TextField,
  CircularProgress,
  Button,
  CardActions,
  Card,
  CardContent,
} from "@mui/material";
import { icons } from "icons/icons.json";
import React, { ChangeEvent, useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { DeviceModel } from "definitions";
import IconSelect from "components/IconSelect";
import { setConfigureDevice } from "./deviceConfigurationSlice";

const UpdateDeviceForm: React.FC<{ updateDevice: DeviceModel }> = ({
  updateDevice,
}) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: updateDevice?.name || "",
    icon: updateDevice?.icon || icons[0],
  });

  const handleUpdate = async () => {
    try {
      await firestore.update(`devices/${updateDevice.id}`, {
        icon: formData.icon,
        name: formData.name,
      });
      dispatch(setConfigureDevice(null));
      enqueueSnackbar("Změna nastavení zařízení úšpěšně provedena", {
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Chyba při změně nastavení zařízení", {
        variant: "error",
      });
    }
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      handleUpdate();
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Card>
      <CardContent>
        <Box display="flex" padding={1}>
          <TextField
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ flex: 1, margin: "0 8px" }}
            label="Název zařízení"
            placeholder="Zadejte název zařízení"
          />
        </Box>
        <IconSelect
          icon={formData.icon}
          onChange={value => setFormData({ ...formData, icon: value })}
        />
      </CardContent>
      <CardActions sx={{ flexDirection: "row-reverse", pr: 4, pb: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {loading ? <CircularProgress color="inherit" size={24} /> : "Uložit"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default UpdateDeviceForm;
