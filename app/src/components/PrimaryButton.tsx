import { Button, ButtonProps } from "@mui/material";

import { styled } from "@material-ui/core/styles";

import withStyles from "@mui/styles/withStyles";

const PREFIX = "PrimaryButton";

const classes = {
  root: `${PREFIX}-root`,
};

const StyledButton = styled(Button)({
  [`& .${classes.root}`]: { margin: "8px 0" },
});

export const PrimaryButton = (props: ButtonProps) => (
  <StyledButton color="primary" variant="contained" {...props}>
    {props.children}
  </StyledButton>
);
