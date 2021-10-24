import { Box } from "@mui/material";
import CurrentUserIcon from "./CurrentUserIcon";
import { useSelector } from "store/useSelector";
import UsersAdministrationIconButton from "./SettingsButton";

const HeaderButtons = () => {
  const isEmpty = useSelector(state => state.firebase.auth.isEmpty);
  const settingsButtonVisible = useSelector(
    state => state.settings.openSettingsButtonVisible
  );
  return !isEmpty ? (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}>
      {settingsButtonVisible && <UsersAdministrationIconButton />}
      <CurrentUserIcon />
    </Box>
  ) : null;
};

export default HeaderButtons;
