import React from "react";
import { styled } from "@material-ui/core/styles";
import { Icon, IconButton } from "@mui/material";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { useDispatch } from "react-redux";
import { nextMedia, previousMedia } from "../../store/slices/preview";

const PREFIX = "PlayNextPrevious";

const classes = {
  icon: `${PREFIX}-icon`,
};

const StyledIconButton = styled(IconButton)(() => ({
  [`&.${classes.icon}`]: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    color: "white",
    zIndex: 99,
  },
}));

interface Props {
  type: "next" | "previous";
}

const PlayNextPrevious: React.FC<Props> = ({ type }) => {
  const dispatch = useDispatch();
  const handleClick = () =>
    dispatch(type === "next" ? nextMedia() : previousMedia());
  return (
    <StyledIconButton
      className={classes.icon}
      style={{
        right: type === "next" ? 0 : undefined,
        left: type === "previous" ? 0 : undefined,
      }}
      onClick={handleClick}
      size="large"
    >
      <Icon>{type === "next" ? "chevron_right" : "chevron_left"}</Icon>
    </StyledIconButton>
  );
};

export default PlayNextPrevious;
