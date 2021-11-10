import { List as MuiList } from "@mui/material";

import withStyles from "@mui/styles/withStyles";

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
