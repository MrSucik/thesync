import { ListItemText as MuiListItemText } from "@mui/material";

import withStyles from "@mui/styles/withStyles";

export const ListItemText = withStyles({
  primary: { color: "rgb(255, 255, 255)" },
  secondary: { color: "rgba(255, 255, 255, 0.7)" },
})(MuiListItemText);
