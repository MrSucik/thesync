import {
  Icon,
  IconButton,
  ListItem,
  ListItemAvatar,
  Popover,
} from "@material-ui/core";
import { useRef, useState } from "react";
import { useFirebase } from "react-redux-firebase";
import RoundedImage from "../../components/RoundedImage";
import { List } from "../../components/List";
import { ListItemText } from "../../components/ListItemText";
import { useCurrentUser } from "../../hooks/useCurrentUser";

const CurrentUserIcon = () => {
  const user = useCurrentUser();
  const firebase = useFirebase();
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  const handleLogoutClick = () => {
    firebase.auth().signOut();
    setOpen(false);
  };
  const anchor = useRef<HTMLElement | null>(null);
  return !user ? null : (
    <span ref={anchor}>
      <IconButton onClick={handleClick}>
        <RoundedImage src={user.photoURL} />
      </IconButton>
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchor.current}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <List>
          <ListItem selected>
            <ListItemText primary={`Přihlášen jako: ${user.email}`} />
          </ListItem>
          <ListItem button onClick={handleLogoutClick}>
            <ListItemAvatar>
              <Icon>logout</Icon>
            </ListItemAvatar>
            <ListItemText primary="Odhlásit se" />
          </ListItem>
        </List>
      </Popover>
    </span>
  );
};

export default CurrentUserIcon;
