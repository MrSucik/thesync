import { Typography } from "@mui/material";

import withStyles from "@mui/styles/withStyles";

export default withStyles(() => ({
  root: {
    fontSize: 16,
    fontWeight: "bold",
    color: "rgba(241, 241, 241, 0.5)",
    textTransform: "uppercase",
    padding: 4,
    lineHeight: "34px",
  },
}))(Typography);
