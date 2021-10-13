import {
  ListItem as MuiListItem,
  ListItemProps,
  withStyles,
} from "@mui/material";

const ListItem: React.FC<Omit<ListItemProps, "button">> = withStyles(() => ({
  root: { background: "#444", borderRadius: 8 },
}))(MuiListItem);

export default ListItem;
