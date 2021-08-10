import { withStyles, Theme, Paper, Typography } from "@material-ui/core";
import Title from "../../components/Title";
import { useCurrentScene } from "../../hooks/useCurrentScene";
import Tabs from "./Tabs";

const SceneDetailContainer = withStyles((theme: Theme) => ({
  root: {
    flex: 3,
    margin: theme.spacing(1, 2),
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.default,
    minWidth: "20rem",
  },
}))(Paper);

const SceneDetail = () => {
  const scene = useCurrentScene();
  return (
    <SceneDetailContainer>
      {!scene ? (
        <Typography
          style={{
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
    </SceneDetailContainer>
  );
};

export default SceneDetail;
