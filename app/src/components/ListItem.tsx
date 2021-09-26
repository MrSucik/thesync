import { ListItem as MuiListItem } from "@mui/material";

import withStyles from "@mui/styles/withStyles";

const ListItem: any = withStyles(() => ({
  root: { background: "#444", borderRadius: 8 },
}))(MuiListItem);

export default ListItem;
