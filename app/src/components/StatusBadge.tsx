import { withStyles, Badge, createStyles, Theme } from "@material-ui/core";

const StatusBadgeBase = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "$ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  })
)(Badge);

export const OnlineBadge = withStyles(() =>
  createStyles({
    badge: {
      color: "#44b700",
      backgroundColor: "#44b700",
    },
  })
)(StatusBadgeBase);

export const OfflineBadge = withStyles(() =>
  createStyles({
    badge: {
      color: "#de4646",
      backgroundColor: "#de4646",
    },
  })
)(StatusBadgeBase);

const StatusBadge: React.FC<{ status: "online" | "offline" }> = ({
  status,
  children,
}) => {
  const Component = status === "online" ? OnlineBadge : OfflineBadge;
  return (
    <Component
      overlap="circle"
      variant="dot"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      {children}
    </Component>
  );
};

export default StatusBadge;
