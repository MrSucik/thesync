import {
  createStyles,
  InputAdornment,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import firebase from "firebase";
import { useSnackbar } from "notistack";
import Action from "../../components/Action";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    icon: {
      color: "white",
    },
    emailField: {
      flex: 1,
      marginRight: theme.spacing(2),
      color: "white",
      "& input": {
        color: "white",
        paddingLeft: theme.spacing(1),
      },
      "& input::placeholder": {
        color: "white",
      },
      "& .MuiInput-underline:before": {
        borderBottomColor: "#fff8",
      },
      "& .MuiInput-underline:hover:before": {
        borderBottomColor: "#fff",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#fff",
      },
    },
  })
);
// eslint-disable-next-line no-control-regex
const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const AddUserButton = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [valid, setValid] = useState(false);
  const firestore = useFirestore();
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
        created: firebase.firestore.FieldValue.serverTimestamp(),
        devices: [],
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
    <TextField
      label="Přidat uživatele"
      value={email}
      onChange={handleChange}
      className={classes.emailField}
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
              iconButtonProps={{ style: { color: "white" } }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
};
export default AddUserButton;
