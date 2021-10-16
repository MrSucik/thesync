import { InputAdornment } from "@mui/material";
import { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import firebase from "firebase/app";
import { useSnackbar } from "notistack";
import Action from "../../components/Action";
import { Field } from "../../components/Field";
import { useSelector } from "../../store/useSelector";

const regex =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const AddUserButton = () => {
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const firestore = useFirestore();
  const devices = useSelector(state =>
    Object.keys(state.firestore.data.devices)
  );
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = async () => {
    try {
      if (!valid) {
        enqueueSnackbar(`Neplatná emailová adresa: ${email}`);
        return;
      }
      const doc = firestore.doc(`users/${email}`);
      const exists = (await doc.get()).exists;
      if (exists) {
        enqueueSnackbar(`Uživatel již existuje: ${email}`);
        return;
      }
      await doc.set({
        email,
        devices,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setEmail("");
      setValid(false);
      enqueueSnackbar(`Uživatel ${email} byl úspěšně přidán do aplikace.`, {
        variant: "success",
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Nepodařilo se přidat uživatele do aplikace!", {
        variant: "error",
      });
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setValid(regex.test(event.target.value));
  };
  return (
    <Field
      label="Přidat uživatele"
      value={email}
      onChange={handleChange}
      sx={{
        flex: 1,
        marginRight: 2,
        "& input": { paddingLeft: 2 },
      }}
      placeholder="Zadejte emailovou adresu"
      type="email"
      variant="filled"
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Action
              icon="add"
              onClick={handleClick}
              tooltip="Povolit uživateli přístup do aplikace"
              iconButtonProps={{ sx: { color: "white" } }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};
export default AddUserButton;
