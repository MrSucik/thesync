import { ListItem as MuiListItem, withStyles } from "@material-ui/core";

const ListItem: any = withStyles(() => ({
  root: { background: "#444", borderRadius: 8 },
}))(MuiListItem);

export default ListItem;
