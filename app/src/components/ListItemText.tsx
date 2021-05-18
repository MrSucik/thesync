import {
  withStyles,
  ListItemText as MuiListItemText
} from "@material-ui/core";

export const ListItemText = withStyles({
  primary: { color: "rgb(255, 255, 255)" },
  secondary: { color: "rgba(255, 255, 255, 0.7)" },
})(MuiListItemText);
