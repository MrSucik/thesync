import { withStyles, Box } from "@material-ui/core";
import React from "react";
import { MediaModel } from "../../definitions";
import { useDownloadURL } from "../../hooks/useDownloadURL";
import { getIconSource } from "../../utils/icons";

const StackedMediaContainer = withStyles({
  root: {
    display: "flex",
    marginLeft: -16,
    overflow: "hidden",
  },
})(Box);
const StackedMediaListItem = withStyles({
  root: {
    height: 100,
    width: 71,
    borderRadius: 8,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    "&:nth-of-type(even)": {
      backgroundColor: "rgba(88, 88, 88, 1)",
    },
    "&:nth-of-type(odd)": {
      backgroundColor: "rgba(31, 31, 31, 1)",
    },
  },
})(Box);

const Media: React.FC<{ media: MediaModel; src?: string }> = ({
  media,
  src,
}) => {
  const url = useDownloadURL(media.file);
  return <img alt={media.name} src={src || url} style={{ maxWidth: "100%" }} />;
};

const StackedMedia: React.FC<{ mediaList: MediaModel[] }> = ({ mediaList }) => (
  <StackedMediaContainer>
    {mediaList.map((media, i) => (
      <StackedMediaListItem key={media.id} style={{ marginLeft: !i ? 0 : -32 }}>
        <Media
          media={media}
          src={
            media.id?.startsWith("bakalari") ? getIconSource("bakalari") : null
          }
        />
      </StackedMediaListItem>
    ))}
  </StackedMediaContainer>
);

export default StackedMedia;
