import { Typography, withStyles } from "@material-ui/core";

const LogoTypography = withStyles(() => ({
  root: {
    fontSize: 32,
    color: "rgba(241, 241, 241, 0.73)",
    fontFamily: "Rubik",
  },
}))(Typography);

const Logo = () => <LogoTypography>the sync</LogoTypography>;

export default Logo;
