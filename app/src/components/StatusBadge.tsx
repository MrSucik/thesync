import { Badge } from "@mui/material";
import { keyframes } from "@mui/styled-engine";

// TODO: Fix animation
const ripple = keyframes`
0%: {
  transform: scale(0.8),
  opacity: 1,
},
100%: {
  transform: scale(2.4),
  opacity: 0,
}`;

const online = { color: "#44b700", backgroundColor: "#44b700" };
const offline = { color: "#de4646", backgroundColor: "#de4646" };

const StatusBadge: React.FC<{ status: "online" | "offline" }> = ({
  status,
  children,
}) => {
  return (
    <Badge
      sx={{
        ".MuiBadge-badge": {
          ...(status === "online" ? online : offline),
          boxShadow: (theme) => `0 0 0 2px ${theme.palette.background.default}`,
          "::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: ripple + " 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
          },
        },
      }}
      variant="dot"
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      {children}
    </Badge>
  );
};

export default StatusBadge;
