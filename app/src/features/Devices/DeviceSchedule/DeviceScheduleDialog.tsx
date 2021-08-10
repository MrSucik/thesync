import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import { useDispatch } from "react-redux";
import { useSelector } from "../../../store";
import { setDeviceScheduleOpen } from "../../../store/slices/app";
import { useFirestore } from "react-redux-firebase";
import { KeyboardTimePicker } from "@material-ui/pickers";
import moment from "moment";
import {
  Box,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@material-ui/core";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

const DeviceScheduleDialog = () => {
  const dispatch = useDispatch();
  const settings = useSelector(
    (state) => state.firestore.ordered.powersettings[0]
  );
  const firestore = useFirestore();
  const open = useSelector((state) => state.app.deviceScheduleOpen);

  const updateSettings = (changes: any) =>
    firestore.add("powersettings", {
      ...settings,
      updated: moment().format(),
      ...changes,
    });

  const handleTimeChange = (date: MaterialUiPickersDate) =>
    updateSettings({ time: moment(date).format() });

  const handleActionChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => updateSettings({ action: event.target.value });

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
          }}
        >
          <KeyboardTimePicker
            margin="none"
            label="Vybrat čas"
            value={settings.time}
            ampm={false}
            onChange={handleTimeChange}
            style={{ flex: 1 }}
            disabled={!settings.enabled}
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
              disabled={!settings.enabled}
            >
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
