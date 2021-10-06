import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)({
  "& input": {
    color: "white",
  },
  "& input::placeholder": {
    color: "white",
  },
  "& .MuiFilledInput-underline:before, .MuiInput-underline:before": {
    borderBottomColor: "#fff8",
  },
  "& .MuiFilledInput-underline:hover:before, .MuiInput-underline:hover:before":
    {
      borderBottomColor: "#fff",
    },
  "& .MuiFilledInput-underline:after, .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& label, label.Mui-focused": { color: "white" },
});

export const Field: React.FC<TextFieldProps> = (props) => (
  <StyledTextField variant="filled" {...props} />
);
