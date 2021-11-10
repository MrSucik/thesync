import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { useDispatch } from "react-redux";
import { useSelector } from "store/useSelector";
import { setDeviceScheduleOpen } from "store/slices/app";
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
import { usePowerSettings } from "hooks/usePowerSettings";


const DeviceScheduleDialog = () => {
  const dispatch = useDispatch();
  const { powerSettings, updatePowerSettings } = usePowerSettings();
  const open = useSelector(state => state.app.deviceScheduleOpen);

  const handleTimeChange = (date: unknown) =>
    updatePowerSettings({ time: moment(date as string).format() });

  const handleActionChange = (event: SelectChangeEvent<unknown>) =>
    updatePowerSettings({ action: event.target.value as string });

  const handleEnabledChange = (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => updatePowerSettings({ enabled: checked });

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
              checked={powerSettings.enabled}
              onChange={handleEnabledChange}
            />
          }
          label={powerSettings.enabled ? "Zapnuto" : "Vypnuto"}
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
            value={powerSettings.time}
            ampm={false}
            onChange={handleTimeChange}
            // style={{ flex: 1 }}
            disabled={!powerSettings.enabled}
            renderInput={props => <TextField {...props} label="Vybrat čas" />}
          />
          <Box flex={1}>
            <InputLabel id="select-label" shrink>
              Akce
            </InputLabel>
            <Select
              labelId="select-label"
              style={{ width: "100%" }}
              value={powerSettings.action}
              onChange={handleActionChange}
              disabled={!powerSettings.enabled}>
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
