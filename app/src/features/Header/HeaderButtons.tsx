import { Box, withStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import CurrentUserIcon from "./CurrentUserIcon";
import { RootState } from "../../store";
import UsersAdministrationIconButton from "./SettingsButton";

const Container = withStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
}))(Box);

const HeaderButtons = () => {
  const isEmpty = useSelector<RootState, boolean>(
    (state) => state.firebase.auth.isEmpty
  );
  const settingsButtonVisible = useSelector<RootState, boolean>(
    (state) => state.settings.openSettingsButtonVisible
  );
  return !isEmpty ? (
    <Container>
      {settingsButtonVisible && <UsersAdministrationIconButton />}
      <CurrentUserIcon />
    </Container>
  ) : null;
};

export default HeaderButtons;
