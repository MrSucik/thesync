import { List as MuiList, withStyles } from "@material-ui/core";

export const List = withStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    overflow: "visible",
    marginBottom: 8,
    flex: 1,
  },
})(MuiList);
