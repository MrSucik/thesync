import { Tooltip } from "@mui/material";

import withStyles from "@mui/styles/withStyles";

export default withStyles(theme => ({
  tooltip: {
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}))(Tooltip);
