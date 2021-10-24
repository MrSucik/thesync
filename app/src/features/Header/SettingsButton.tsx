import { Icon, ListItem, ListItemAvatar, Popover } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Action from "components/Action";
import { List } from "components/List";
import { ListItemText } from "components/ListItemText";
import { setUserAdministrationOpen } from "store/slices/settings";

const UsersAdministrationIconButton = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleClickListItem = () => {
    dispatch(setUserAdministrationOpen(true));
    setOpen(false);
  };
  const handleClickList = () => setOpen(true);
  const anchor = useRef<HTMLElement | null>(null);
  return (
    <span ref={anchor}>
      <Action
        icon="settings"
        onClick={handleClickList}
        iconProps={{
          sx: { color: "rgba(241, 241, 241, 0.73)", fontSize: 32 },
        }}
      />
      <Popover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchor.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}>
        <List>
          <ListItem button onClick={handleClickListItem}>
            <ListItemAvatar>
              <Icon>manage_accounts</Icon>
            </ListItemAvatar>
            <ListItemText>Nastavení uživatelů</ListItemText>
          </ListItem>
        </List>
      </Popover>
    </span>
  );
};

export default UsersAdministrationIconButton;
