import { Switch, FormControlLabel, SwitchProps } from "@mui/material";

const switchStyles = { marginRight: 0 };

interface CustomSwitchProps extends SwitchProps {
  label: string;
}

export const CustomSwitch: React.FC<CustomSwitchProps> = ({
  label,
  onChange,
  ...props
}) => {
  const transformSwitchEvent = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    event.target.value = checked as any;
  };
  return (
    <FormControlLabel
      sx={switchStyles}
      control={
        <Switch
          color="info"
          onChange={(event, checked) => {
            transformSwitchEvent(event, checked);
            onChange && onChange(event, checked);
          }}
          {...props}
        />
      }
      labelPlacement="start"
      label={label}
    />
  );
};
