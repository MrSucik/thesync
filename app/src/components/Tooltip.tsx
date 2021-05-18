import { withStyles, Theme, Tooltip } from "@material-ui/core";

export default withStyles((theme: Theme) => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);
