import { Box } from "@mui/material";
import React from "react";
import { MediaModel } from "../../definitions";
import { useDownloadURL } from "../../hooks/useDownloadURL";
import { getIconSourceSvg } from "../../utils/icons";

const Media: React.FC<{ media: MediaModel; src?: string }> = ({
  media,
  src,
}) => {
  const url = useDownloadURL(media.file);
  return <img alt={media.name} src={src || url} style={{ maxWidth: "100%" }} />;
};

const StackedMedia: React.FC<{ mediaList: MediaModel[] }> = ({ mediaList }) => (
  <Box sx={{ display: "flex", marginLeft: -2, overflow: "hidden" }}>
    {mediaList.map((media, index) => (
      <Box
        key={media.id}
        sx={{
          height: 100,
          width: 71,
          borderRadius: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          marginLeft: index === 0 ? 0 : -2,
          ":nth-of-type(even)": { backgroundColor: "rgba(88, 88, 88, 1)" },
          ":nth-of-type(odd)": { backgroundColor: "rgba(31, 31, 31, 1)" },
        }}
      >
        <Media
          media={media}
          src={media.bakalariType ? getIconSourceSvg("bakalari") : null}
        />
      </Box>
    ))}
  </Box>
);

export default StackedMedia;
