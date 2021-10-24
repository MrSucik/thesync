import { Box, Button, FormGroup } from "@mui/material";
import { useFirestore } from "react-redux-firebase";
import { useCurrentScene } from "../../hooks/useCurrentScene";
import { useDispatch } from "react-redux";
import { setSelectedScene } from "../../store/slices/app";
import { useFormik } from "formik";
import { SceneModel } from "../../definitions";
import { Field } from "../../components/Field";
import { CustomSwitch } from "../../components/CustomSwitch";
import { PrimaryButton } from "../../components/PrimaryButton";
import CustomColorPicker from "../../components/CustomColorPicker";
import { useSnackbar } from "notistack";

const Settings = () => {
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const {
    footer,
    backgroundColor,
    name,
    id,
    hideProgress,
    hideWeather,
    hideNameDay,
  } = useCurrentScene();
  const handleDeleteClick = async () => {
    await firestore.delete(`scenes/${id}`);
    dispatch(setSelectedScene(null));
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name,
      footer,
      backgroundColor,
      hideProgress,
      hideWeather,
      hideNameDay,
    },
    onSubmit: async (values, { resetForm }) => {
      const databaseScene = await firestore.update(`scenes/${id}`, values);
      let updatedScene = values;
      updatedScene = databaseScene?.data() as SceneModel;
      resetForm({ values: updatedScene });
      enqueueSnackbar("Úspěšně uloženo", { variant: "success" });
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}>
        <Field
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          label="Název"
        />
        <CustomColorPicker
          name="backgroundColor"
          value={formik.values.backgroundColor}
          onChange={formik.handleChange}
          label="Barva pozadí"
        />
        <CustomSwitch
          name="hideWeather"
          checked={formik.values.hideWeather}
          onChange={formik.handleChange}
          label="Schovat počasí"
        />
        <CustomSwitch
          name="hideProgress"
          checked={formik.values.hideProgress}
          onChange={formik.handleChange}
          label="Schovat progressbar"
        />
        <CustomSwitch
          name="hideNameDay"
          checked={formik.values.hideNameDay}
          onChange={formik.handleChange}
          label="Schovat svátek"
        />
      </FormGroup>
      <FormGroup sx={{ flexDirection: "row-reverse", gap: 1, marginTop: 4 }}>
        <PrimaryButton type="submit" disabled={!formik.dirty}>
          uložit změny
        </PrimaryButton>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDeleteClick}>
          odstranit scénu
        </Button>
      </FormGroup>
    </Box>
  );
};

export default Settings;
