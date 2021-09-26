import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Title from "../../components/Title";
import { useCurrentScene } from "../../hooks/useCurrentScene";
import Tabs from "./Tabs";

const SceneDetail = () => {
  const scene = useCurrentScene();
  return (
    <Box
      sx={{
        flex: 3,
        margin: "8px 16px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
        minWidth: "20rem",
      }}
    >
      {!scene ? (
        <Typography
          sx={{
            alignSelf: "center",
            color: "gray",
            lineHeight: "calc(100vh - 100px)",
          }}
        >
          Vyberte scénu
        </Typography>
      ) : (
        <>
          <Title>{scene.name}</Title>
          <Tabs />
        </>
      )}
    </Box>
  );
};

export default SceneDetail;
