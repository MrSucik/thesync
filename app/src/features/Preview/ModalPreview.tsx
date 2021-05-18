import { Box, Modal } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setPreviewMediaList } from "../../store/slices/preview";
import Preview from "./Preview";

const ModalPreview = () => {
  const dispatch = useDispatch();
  const handleClose = () =>
    dispatch(setPreviewMediaList({ mediaList: [], type: "closed" }));
  const isOpen = useSelector<RootState, boolean>(
    (state) => state.preview.type === "modal"
  );
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <Preview />
      </Box>
    </Modal>
  );
};

export default ModalPreview;
