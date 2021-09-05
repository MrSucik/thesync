import { Box } from "@material-ui/core";
import { useRef } from "react";
import Weather from "./Weather";

const Footer = () => {
  const weatherRef = useRef<HTMLDivElement>(null);
  return (
    <Box
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
        position: "relative"
      }}
    >
      <img
        style={{
          height: "2rem",
          maxHeight: 40,
          maxWidth: `calc(100% - 8px - ${weatherRef.current?.clientWidth}px)`,
          margin: "auto",
        }}
        src="https://thesync.web.app/wigym-logo.svg"
        alt="wigym logo"
      />
      <Weather />
    </Box>
  );
};

export default Footer;
