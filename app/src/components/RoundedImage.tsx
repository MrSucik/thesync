import { Avatar } from "@mui/material";

import withStyles from "@mui/styles/withStyles";

export default withStyles({
  root: { width: 32, height: 32, borderRadius: 8 },
  img: {
    transition: "background 150ms ease-in-out",
    "&:hover": { background: "#555" },
  },
})(Avatar);
