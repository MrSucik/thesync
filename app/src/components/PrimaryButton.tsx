import { Button, ButtonProps, withStyles } from "@material-ui/core";

export const PrimaryButton = withStyles({ root: { margin: "8px 0" } })(
  (props: ButtonProps) => (
    <Button color="primary" variant="contained" {...props}>
      {props.children}
    </Button>
  )
);
