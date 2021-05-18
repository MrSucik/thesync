import { Avatar, withStyles } from "@material-ui/core";

export default withStyles({
  root: { width: 32, height: 32, borderRadius: 8 },
  img: {
    transition: "background 150ms ease-in-out",
    "&:hover": { background: "#555" },
  },
})(Avatar);
