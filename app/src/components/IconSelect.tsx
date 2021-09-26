import React from "react";
import { styled } from "@material-ui/core/styles";
import { icons } from "../icons/icons.json";
import { Box, Avatar, Theme } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { getIconSource } from "../utils/icons";
import clsx from "clsx";

const PREFIX = "IconSelect";

const classes = {
  container: `${PREFIX}-container`,
  icon: `${PREFIX}-icon`,
  selected: `${PREFIX}-selected`,
};

const StyledBox = styled(Box)(({ theme }) => ({
  [`&.${classes.container}`]: {
    width: 40 * 5 + 16 * 4,
    display: "grid",
    margin: "8px auto",
    gridTemplateColumns: "repeat(5, 40px)",
    gap: theme.spacing(1, 2),
  },

  [`& .${classes.icon}`]: {
    cursor: "pointer",
  },

  [`& .${classes.selected}`]: {
    border: `4px solid ${theme.palette.info.main}`,
  },
}));

interface Props {
  icon: string;
  onChange: (value: string) => void;
}

const IconSelect: React.FC<Props> = ({ icon, onChange }) => {
  const sources = icons.map((i) => getIconSource(i));
  return (
    <StyledBox className={classes.container}>
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
    </StyledBox>
  );
};
export default IconSelect;
