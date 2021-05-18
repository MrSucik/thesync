import { withStyles, Box, Theme } from "@material-ui/core";

export default withStyles((theme: Theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    padding: "16px 32px",
    backgroundColor: theme.palette.background.paper,
    height: 86,
  },
}))(Box);
