import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& input": { color: "white" },
  "& label, label.Mui-focused": { color: "white" },
  "& .MuiFilledInput-underline:after": { borderBottomColor: "white" },
});

export const Field: React.FC<TextFieldProps> = (props) => (
  <StyledTextField variant="filled" {...props} />
);
