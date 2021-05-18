import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  FormLabel,
  Icon,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  withStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import { List } from "../../components/List";
import StatusBadge from "../../components/StatusBadge";
import { DeviceModel, UserModel } from "../../definitions";
import { useSelector } from "../../store";
import { getIconSource } from "../../utils/icons";
import moment from "moment";

const BeatifulSwitch = withStyles({
  switchBase: {
    "&$checked": { color: "#74aa44" },
    "&$checked + $track": { backgroundColor: "#74aa44" },
  },
  track: {},
  checked: {},
})(Switch);

const DeviceListItem: React.FC<{
  isChecked: boolean;
  device: DeviceModel;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
}> = ({ isChecked, device, onChange }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <StatusBadge status={device.status}>
          <Avatar alt={device.name} src={getIconSource(device.icon)} />
        </StatusBadge>
      </ListItemAvatar>
      <ListItemText primary={device.name} />
      <ListItemSecondaryAction>
        <BeatifulSwitch edge="end" onChange={onChange} checked={isChecked} />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const DeviceList: React.FC<{ user: string }> = ({ user }) => {
  const firestore = useFirestore();
  const devices = useSelector((state) => state.firestore.ordered.devices);
  const checkedDevices = useSelector<string[]>(
    (state) => state.firestore.data.users[user]?.devices || []
  );
  const createChangeHandler = (id: string) => (
    _event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    if (checked) {
      firestore.update(`users/${user}`, {
        devices: [...checkedDevices, id],
      });
    } else {
      firestore.update(`users/${user}`, {
        devices: checkedDevices.filter((x) => x !== id),
      });
    }
  };
  return (
    <>
      <FormLabel style={{ textAlign: "center" }} component="legend">
        Uživatel je oprávněn ovládat následující zařízení
      </FormLabel>
      <List>
        {devices.map((device) => (
          <DeviceListItem
            key={device.id}
            device={device}
            onChange={createChangeHandler(device.id)}
            isChecked={checkedDevices.includes(device.id)}
          />
        ))}
      </List>
    </>
  );
};

const UserListItem: React.FC<{ user: UserModel }> = ({ user }) => {
  const [expanded, setExpanded] = useState(false);
  const firestore = useFirestore();
  const handleDeleteClick = () => firestore.delete(`users/${user.email}`);
  return (
    <Accordion
      expanded={user.bigD ? false : expanded}
      onChange={() => setExpanded(!expanded)}
      style={{ backgroundColor: "#323232" }}
    >
      <AccordionSummary
        style={{ cursor: user.bigD ? "default" : "pointer" }}
        expandIcon={
          user.bigD ? null : (
            <Icon>{!expanded ? "expand_more" : "expand_less"}</Icon>
          )
        }
      >
        <ListItem>
          <ListItemAvatar>
            <Avatar src={user.photoURL} />
          </ListItemAvatar>
          <ListItemText
            primary={user.displayName || user.email}
            secondary={
              !user.lastLogin
                ? `Pozvánka odeslána: ${moment(user.created?.toDate()).format(
                    "DD.MM.YYYY HH:mm"
                  )}`
                : `Naposledy přihlášen: ${moment(
                    user.lastLogin?.toDate()
                  ).format("DD.MM.YYYY HH:mm")}`
            }
          />
        </ListItem>
      </AccordionSummary>
      <AccordionDetails>
        <Box flex={1}>
          <DeviceList user={user.id} />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDeleteClick}
            fullWidth
          >
            odstranit uživatele z aplikace
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserListItem;
