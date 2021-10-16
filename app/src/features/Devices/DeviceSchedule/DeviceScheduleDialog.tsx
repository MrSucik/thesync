import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store/useSelector";
import { setDeviceScheduleOpen } from "../../../store/slices/app";
import { useFirestore } from "react-redux-firebase";
import moment from "moment";
import {
  Box,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { TimePicker } from "@mui/lab";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

interface Powersettings {
  enabled: boolean;
  time: string;
  action: string;
}

const DeviceScheduleDialog = () => {
  const dispatch = useDispatch();
  const settings = useSelector(
    state => state.firestore.ordered.powersettings[0]
  );
  const firestore = useFirestore();
  const open = useSelector(state => state.app.deviceScheduleOpen);
  const user = useCurrentUser();
  const updateSettings = (changes: Partial<Powersettings>) =>
    firestore.add("powersettings", {
      ...settings,
      author: user?.email,
      area: user?.area,
      updated: moment().format(),
      ...changes,
    });

  const handleTimeChange = (date: unknown) =>
    updateSettings({ time: moment(date as string).format() });

  const handleActionChange = (event: SelectChangeEvent<unknown>) =>
    updateSettings({ action: event.target.value as string });

  const handleEnabledChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => updateSettings({ enabled: checked });

  const handleCancel = () => dispatch(setDeviceScheduleOpen(false));

  return (
    <Dialog onClose={handleCancel} open={open}>
      <DialogTitle>
        Nastavení automatického vypnutí nebo restartování všech zařízení
      </DialogTitle>
      <DialogContent dividers>
        <FormControlLabel
          control={
            <Switch
              color="secondary"
              checked={settings.enabled}
              onChange={handleEnabledChange}
            />
          }
          label={settings.enabled ? "Zapnuto" : "Vypnuto"}
        />
        <Box
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "2rem",
            marginTop: "1rem",
          }}>
          <TimePicker
            // margin="none"
            value={settings.time}
            ampm={false}
            onChange={handleTimeChange}
            // style={{ flex: 1 }}
            disabled={!settings.enabled}
            renderInput={() => <TextField label="Vybrat čas" />}
          />
          <Box flex={1}>
            <InputLabel id="select-label" shrink>
              Akce
            </InputLabel>
            <Select
              labelId="select-label"
              style={{ width: "100%" }}
              value={settings.action}
              onChange={handleActionChange}
              disabled={!settings.enabled}>
              <MenuItem value="shutdown">Vypnout</MenuItem>
              <MenuItem value="reboot">Restartovat</MenuItem>
            </Select>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          zavřít
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeviceScheduleDialog;
