import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { MediaModel } from "../../definitions";
import { RootState } from "../../store";
import { PreviewState } from "../../store/slices/preview";
import Overlay from "./Overlay";
import ProgressBarItem from "./ProgressBarItem";

const ProgressBar: React.FC = () => {
  const { previewMediaList } = useSelector<RootState, PreviewState>(
    state => state.preview
  );
  const mediaList = useSelector<RootState, MediaModel[]>(state =>
    previewMediaList.map(id => state.firestore.data.media[id])
  );
  return (
    <Overlay height={96}>
      <Box
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: `repeat(${mediaList.length}, minmax(0, 1fr))`,
          columnGap: 8,
          padding: 16,
        }}>
        {mediaList.map((media, index) => (
          <ProgressBarItem
            key={previewMediaList[index]}
            media={media}
            index={index}
          />
        ))}
      </Box>
    </Overlay>
  );
};

export default ProgressBar;
