import React from "react";
import { createStyles, Icon, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      marginLeft: 4,
      fontSize: 16,
      alignSelf: "center",
      animation: "$slide 1s alternate infinite ease-in-out",
    },
    "@keyframes slide": {
      "0%": {
        transform: "translateX(4px)",
      },
      "100%": {
        transform: "translateX(0)",
      },
    },
  })
);

const NextIcon = () => {
  const classes = useStyles();
  return <Icon className={classes.icon}>arrow_forward_ios</Icon>;
};

export default NextIcon;
