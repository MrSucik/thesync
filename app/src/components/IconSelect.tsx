import React from "react";
import { icons } from "../icons/icons.json";
import { Box, Avatar, makeStyles, Theme } from "@material-ui/core";
import { getIconSource } from "../utils/icons";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: 40 * 5 + 16 * 4,
    display: "grid",
    margin: "8px auto",
    gridTemplateColumns: "repeat(5, 40px)",
    gap: theme.spacing(1, 2),
  },
  icon: {
    cursor: "pointer",
  },
  selected: {
    border: `4px solid ${theme.palette.info.main}`,
  },
}));

interface Props {
  icon: string;
  onChange: (value: string) => void;
}

const IconSelect: React.FC<Props> = ({ icon, onChange }) => {
  const classes = useStyles();
  const sources = icons.map((i) => getIconSource(i));
  return (
    <Box className={classes.container}>
      {sources.map((source, index) => (
        <Avatar
          key={index}
          className={clsx(
            classes.icon,
            icon === icons[index] && classes.selected
          )}
          src={source}
          onClick={() => onChange(icons[index])}
        />
      ))}
    </Box>
  );
};
export default IconSelect;
