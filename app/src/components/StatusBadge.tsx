import { Badge, BadgeOrigin } from "@mui/material";

const StatusBadge: React.FC<{
  status: "online" | "offline";
  size?: number;
  origin?: BadgeOrigin;
}> = ({
  status,
  size = 6,
  origin = { vertical: "bottom", horizontal: "right" },
  children,
}) => {
  return (
    <Badge
      sx={{
        ".MuiBadge-badge": {
          height: size,
          minWidth: size,
          right: "6%",
          left: "auto",
          boxShadow: theme => `0 0 0 2px ${theme.palette.background.default}`,
        },
      }}
      variant="dot"
      overlap="circular"
      anchorOrigin={origin}
      color={status === "online" ? "success" : "error"}>
      {children}
    </Badge>
  );
};

export default StatusBadge;
