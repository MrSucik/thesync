import Logo from "./Logo";
import HeaderButtons from "./HeaderButtons";
import { Box } from "@mui/system";

const Header = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      padding: "16px 32px",
      backgroundColor: "background.paper",
      height: 86,
    }}
  >
    <Logo />
    <HeaderButtons />
  </Box>
);

export default Header;
