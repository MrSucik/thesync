import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "../../store/useSelector";
import Preview from "../Preview/Preview";
import { setPreviewMediaList } from "../../store/slices/preview";
import { setSelectedScene } from "../../store/slices/app";
import { Box } from "@mui/material";

const ClientPreview: React.FC<{ deviceId: string }> = ({ deviceId }) => {
  const dispatch = useDispatch();
  const scene = useSelector<string>(
    state => state.firestore.data.devices[deviceId].scene
  );
  const mediaList = useSelector<string[]>(
    state => state.firestore.data.scenes[scene].mediaList
  );
  useEffect(() => {
    dispatch(setSelectedScene(scene));
    dispatch(setPreviewMediaList({ type: "client", mediaList }));
  }, [scene, mediaList, dispatch]);
  return scene ? (
    <Box style={{ height: "100vh", width: "100%" }}>
      <Preview disableControls />
    </Box>
  ) : null;
};

export default ClientPreview;
