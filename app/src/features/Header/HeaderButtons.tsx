import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import CurrentUserIcon from "./CurrentUserIcon";
import { RootState } from "../../store";
import UsersAdministrationIconButton from "./SettingsButton";

const HeaderButtons = () => {
  const isEmpty = useSelector<RootState, boolean>(
    state => state.firebase.auth.isEmpty
  );
  const settingsButtonVisible = useSelector<RootState, boolean>(
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
