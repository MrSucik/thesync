import React from "react";
import { icons } from "../icons/icons.json";
import { Box, Avatar } from "@mui/material";
import { getIconSourceSvg } from "../utils/icons";

interface Props {
  icon: string;
  onChange: (value: string) => void;
}

const IconSelect: React.FC<Props> = ({ icon, onChange }) => {
  const sources = icons.map(i => getIconSourceSvg(i));
  return (
    <Box
      sx={{
        width: 40 * 5 + 16 * 4,
        display: "grid",
        margin: "8px auto",
        gridTemplateColumns: "repeat(5, 40px)",
        gap: "8px 16px",
      }}>
      {sources.map((source, index) => (
        <Avatar
          key={index}
          sx={{
            cursor: "pointer",
            boxShadow: icon === icons[index] ? "0 0 0 4px #098292" : undefined,
          }}
          src={source}
          onClick={() => onChange(icons[index])}
        />
      ))}
    </Box>
  );
};
export default IconSelect;
