import { Button, ButtonProps } from "@mui/material";

export const PrimaryButton = (props: ButtonProps) => (
  <Button color="primary" variant="contained" {...props}>
    {props.children}
  </Button>
);
