import { withStyles, Box, Button, TextField } from "@material-ui/core";
import { useFirestore } from "react-redux-firebase";
import { useCurrentScene } from "../../hooks/useCurrentScene";
import ColorPicker from "material-ui-color-picker";
import { SceneModel } from "../../definitions";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedScene } from "../../store/slices/app";
import { useSelector } from "../../store";

const FormGroup = withStyles({
  root: { display: "flex", flexDirection: "column", gap: 8 },
})(Box);
const SettingsContainer = withStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    justifyContent: "space-between",
    padding: 8,
  },
})(Box);

const Settings = () => {
  const { footer, backgroundColor, name, id } = useCurrentScene();
  const [formData, setFormData] = useState({ name, footer, backgroundColor });
  const scenes = useSelector((state) => state.firestore.ordered.scenes);
  const firestore = useFirestore();
  const dispatch = useDispatch();
  const handleDeleteClick = async () => {
    await firestore.delete(`scenes/${id}`);
    const updatedScenes = scenes.filter((x) => x.id !== id);
    dispatch(setSelectedScene(null));
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    handleChange(name, value);
  };
  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value });
    updateDb({ [name]: value });
  };
  const updateDb = (payload: Partial<SceneModel>) =>
    firestore.update(`scenes/${id}`, { ...payload });
  const ref = useRef<HTMLInputElement>();
  useEffect(() => {
    if (ref.current) {
      ref.current.value = "IIIIIIIIIIIIIIIIIIIIIIIIIIII";
    }
  }, []);
  useEffect(() => {
    setFormData({ name, footer, backgroundColor });
  }, [id]);
  return (
    <SettingsContainer>
      <FormGroup>
        <TextField
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          variant="filled"
          label="Název"
        />
        {/* <TextField
          name="footer"
          value={formData.footer}
          onChange={handleInputChange}
          variant="filled"
          label="Text v patičce"
        /> */}
        <ColorPicker
          inputRef={ref}
          value={formData.backgroundColor}
          onChange={(color) =>
            color && handleChange("backgroundColor", color + "")
          }
          variant="filled"
          label="Barva pozadí"
        />
      </FormGroup>
      <Button variant="contained" color="secondary" onClick={handleDeleteClick}>
        odstranit scénu
      </Button>
    </SettingsContainer>
  );
};

export default Settings;
