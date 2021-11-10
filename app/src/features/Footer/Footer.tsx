import { Box } from "@mui/material";
import { useRef } from "react";
import Weather from "./Weather";
import { useCurrentScene } from "hooks/useCurrentScene";
import NameDay from "./NameDay";

const Footer = () => {
  const scene = useCurrentScene();

  const weatherRef = useRef<HTMLDivElement>(null);
  return (
    <Box
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 8,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      {!scene.hideNameDay && <NameDay />}
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
      {!scene.hideWeather && <Weather />}
    </Box>
  );
};

export default Footer;
